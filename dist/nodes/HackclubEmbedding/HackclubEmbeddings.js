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
        console.log('[HackclubEmbeddings] Initialized with model:', this.model);
        console.log('[HackclubEmbeddings] Base URL:', this.baseUrl);
        console.log('[HackclubEmbeddings] Strip new lines:', this.stripNewLines);
    }
    async embedDocuments(texts) {
        var _a, _b, _c;
        console.log('[HackclubEmbeddings] Embedding documents, count:', texts.length);
        const batches = this.batchTexts(texts);
        console.log('[HackclubEmbeddings] Split into', batches.length, 'batches');
        const embeddings = [];
        for (let i = 0; i < batches.length; i++) {
            const batch = batches[i];
            console.log(`[HackclubEmbeddings] Processing batch ${i + 1}/${batches.length}, size: ${batch.length}`);
            try {
                const response = await axios_1.default.post(`${this.baseUrl}/embeddings`, {
                    input: batch,
                    model: this.model,
                }, {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                });
                console.log('[HackclubEmbeddings] Server response:', JSON.stringify(response.data, null, 2));
                const responseData = response.data;
                embeddings.push(...responseData.data.map((item) => item.embedding));
                console.log(`[HackclubEmbeddings] Batch ${i + 1} completed, received ${responseData.data.length} embeddings`);
                console.log('[HackclubEmbeddings] First embedding sample (first 5 values):', (_a = responseData.data[0]) === null || _a === void 0 ? void 0 : _a.embedding.slice(0, 5));
            }
            catch (error) {
                console.error(`[HackclubEmbeddings] Error in batch ${i + 1}:`, error);
                if (axios_1.default.isAxiosError(error)) {
                    console.error('[HackclubEmbeddings] Response status:', (_b = error.response) === null || _b === void 0 ? void 0 : _b.status);
                    console.error('[HackclubEmbeddings] Response data:', (_c = error.response) === null || _c === void 0 ? void 0 : _c.data);
                }
                throw error;
            }
        }
        console.log('[HackclubEmbeddings] Total embeddings generated:', embeddings.length);
        return embeddings;
    }
    async embedQuery(text) {
        console.log('[HackclubEmbeddings] Embedding single query, length:', text.length);
        const embeddings = await this.embedDocuments([text]);
        return embeddings[0];
    }
    batchTexts(texts, batchSize = 512) {
        const processedTexts = this.stripNewLines
            ? texts.map((text) => text.replace(/\n/g, ' '))
            : texts;
        if (this.stripNewLines) {
            console.log('[HackclubEmbeddings] Stripped new lines from texts');
        }
        const batches = [];
        for (let i = 0; i < processedTexts.length; i += batchSize) {
            batches.push(processedTexts.slice(i, i + batchSize));
        }
        return batches;
    }
}
exports.HackclubEmbeddings = HackclubEmbeddings;
//# sourceMappingURL=HackclubEmbeddings.js.map