"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackclubEmbeddingApi = void 0;
class HackclubEmbeddingApi {
    constructor() {
        this.name = 'hackclubEmbeddingApi';
        this.displayName = 'Hackclub Embedding API';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
            {
                displayName: 'API URL',
                name: 'apiUrl',
                type: 'string',
                default: 'https://ai.hackclub.com/proxy/v1',
                placeholder: 'https://ai.hackclub.com/proxy/v1',
            },
        ];
    }
}
exports.HackclubEmbeddingApi = HackclubEmbeddingApi;
//# sourceMappingURL=HackclubEmbeddingApi.credentials.js.map