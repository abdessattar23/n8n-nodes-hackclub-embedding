import { NodeConnectionTypes, type INodeType, type INodeTypeDescription, type SupplyData, type ISupplyDataFunctions } from 'n8n-workflow';
import { HackclubEmbeddings } from './HackclubEmbeddings'; // You'll create this

export class HackclubEmbedding implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hackclub Embedding',
		name: 'hackclubEmbedding',
		icon: { light: 'file:hackclubEmbedding.svg', dark: 'file:hackclubEmbedding.dark.svg' },
		group: ['transform'],
		version: 1,
		description: 'Generate embeddings using Hackclub API',
		defaults: {
			name: 'Hackclub Embedding',
		},
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
		outputs: [NodeConnectionTypes.AiEmbedding],
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
								url: '/models',
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
										type: 'filter',
										properties: {
											pass: '={{ $responseItem.id.includes("embed") }}',
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
				default: 'openai/text-embedding-3-large',
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
						type: 'boolean',
					},
				],
			},
		],
	};

	async supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData> {
		const credentials = await this.getCredentials('hackclubEmbeddingApi');
		const model = this.getNodeParameter('model', itemIndex) as string;
		const options = this.getNodeParameter('options', itemIndex, {}) as {
			batchSize?: number;
			stripNewLines?: boolean;
		};

		const embeddings = new HackclubEmbeddings({
			apiKey: credentials.apiKey as string,
			model: model,
			baseUrl: credentials.apiUrl as string,
			...options,
		});

		return {
			response: embeddings,
		};
	}
}
