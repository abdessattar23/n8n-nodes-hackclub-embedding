"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackclubEmbeddingApi = void 0;
class HackclubEmbeddingApi {
    constructor() {
        this.name = 'hackclubEmbeddingApi';
        this.displayName = 'Hackclub Embedding API';
        this.icon = { light: 'file:credentials/hackclubEmbedding.svg', dark: 'file:credentials/hackclubEmbedding.dark.svg' };
        this.documentationUrl = 'https://docs.ai.hackclub.com/api';
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
        this.test = {
            request: {
                baseURL: '={{$credentials?.apiUrl}}',
                url: '/models',
                headers: {
                    Authorization: 'Bearer ={{$credentials.apiKey}}',
                },
            },
        };
    }
}
exports.HackclubEmbeddingApi = HackclubEmbeddingApi;
//# sourceMappingURL=HackclubEmbeddingApi.credentials.js.map