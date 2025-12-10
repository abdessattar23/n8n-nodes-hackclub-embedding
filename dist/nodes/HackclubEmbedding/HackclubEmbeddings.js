"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackclubEmbeddings = void 0;
const embeddings_1 = require("@langchain/core/embeddings");
const axios_1 = __importDefault(require("axios"));
class HackclubEmbeddings extends embeddings_1.Embeddings {
    constructor(params) {
        var _a;
        super(params);
        this.apiKey = params.apiKey;
        this.model = params.model;
        this.baseUrl = params.baseUrl || 'https://ai.hackclub.com/proxy/v1';
        this.stripNewLines = (_a = params.stripNewLines) !== null && _a !== void 0 ? _a : true;
    }
    async embedDocuments(texts) {
        const batches = this.batchTexts(texts);
        const embeddings = [];
        for (const batch of batches) {
            const response = await axios_1.default.post(`${this.baseUrl}/embeddings`, {
                input: batch,
                model: this.model,
            }, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                },
            });
            embeddings.push(...response.data.data.map((item) => item.embedding));
        }
        return embeddings;
    }
    async embedQuery(text) {
        const embeddings = await this.embedDocuments([text]);
        return embeddings[0];
    }
    batchTexts(texts, batchSize = 512) {
        const batches = [];
        for (let i = 0; i < texts.length; i += batchSize) {
            batches.push(texts.slice(i, i + batchSize));
        }
        return batches;
    }
}
exports.HackclubEmbeddings = HackclubEmbeddings;
//# sourceMappingURL=HackclubEmbeddings.js.map