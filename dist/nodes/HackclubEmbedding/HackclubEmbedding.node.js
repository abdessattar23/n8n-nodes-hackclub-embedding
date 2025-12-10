"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HackclubEmbedding = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const HackclubEmbeddings_1 = require("./HackclubEmbeddings");
class HackclubEmbedding {
    constructor() {
        this.description = {
            displayName: 'Hackclub Embedding',
            name: 'hackclubEmbedding',
            icon: { light: 'file:hackclubEmbedding.svg', dark: 'file:hackclubEmbedding.dark.svg' },
            group: ['transform'],
            version: 1,
            description: 'Generate embeddings using Hackclub API',
            defaults: {
                name: 'Hackclub Embedding',
            },
            usableAsTool: true,
            codex: {
                categories: ['AI'],
                subcategories: {
                    AI: ['Embeddings'],
                },
                resources: {
                    primaryDocumentation: [
                        {
                            url: 'https://docs.ai.hackclub.com/api/embeddings.html',
                        },
                    ],
                },
            },
            inputs: [],
            outputs: [n8n_workflow_1.NodeConnectionTypes.AiEmbedding],
            outputNames: ['Embeddings'],
            credentials: [{ name: 'hackclubEmbeddingApi', required: true }],
            requestDefaults: {
                baseURL: 'https://ai.hackclub.com/proxy/v1',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            },
            properties: [
                {
                    displayName: 'Model',
                    name: 'model',
                    type: 'options',
                    description: 'The model to generate embeddings',
                    typeOptions: {
                        loadOptions: {
                            routing: {
                                request: {
                                    method: 'GET',
                                    url: '/embeddings/models',
                                },
                                output: {
                                    postReceive: [
                                        {
                                            type: 'rootProperty',
                                            properties: {
                                                property: 'data',
                                            },
                                        },
                                        {
                                            type: 'setKeyValue',
                                            properties: {
                                                name: '={{$responseItem.id}}',
                                                value: '={{$responseItem.id}}',
                                            },
                                        },
                                        {
                                            type: 'sort',
                                            properties: {
                                                key: 'name',
                                            },
                                        },
                                    ],
                                },
                            },
                        },
                    },
                    routing: {
                        send: {
                            type: 'body',
                            property: 'model',
                        },
                    },
                    default: '',
                    displayOptions: {
                        show: {
                            '@version': [1],
                        },
                    },
                },
                {
                    displayName: 'Options',
                    name: 'options',
                    placeholder: 'Add Option',
                    type: 'collection',
                    default: {},
                    options: [
                        {
                            displayName: 'Batch Size',
                            name: 'batchSize',
                            default: 512,
                            typeOptions: { maxValue: 2048 },
                            description: 'Maximum documents per request',
                            type: 'number',
                        },
                        {
                            displayName: 'Strip New Lines',
                            name: 'stripNewLines',
                            default: true,
                            description: 'Whether to strip new lines from input text',
                            type: 'boolean',
                        },
                    ],
                },
            ],
        };
    }
    async supplyData(itemIndex) {
        const credentials = await this.getCredentials('hackclubEmbeddingApi');
        const model = this.getNodeParameter('model', itemIndex);
        const options = this.getNodeParameter('options', itemIndex, {});
        const embeddings = new HackclubEmbeddings_1.HackclubEmbeddings({
            apiKey: credentials.apiKey,
            model: model,
            baseUrl: credentials.apiUrl,
            ...options,
        });
        return {
            response: embeddings,
        };
    }
}
exports.HackclubEmbedding = HackclubEmbedding;
//# sourceMappingURL=HackclubEmbedding.node.js.map