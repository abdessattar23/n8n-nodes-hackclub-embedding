import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class HackclubEmbeddingApi implements ICredentialType {
	name = 'hackclubEmbeddingApi';
	displayName = 'Hackclub Embedding API';
	icon = { light: 'file:credentials/hackclubEmbedding.svg', dark: 'file:credentials/hackclubEmbedding.dark.svg' } as const;
	documentationUrl = 'https://docs.ai.hackclub.com/api';
	properties: INodeProperties[] = [
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
	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.apiUrl}}',
			url: '/embeddings/models',
			headers: {
				Authorization: 'Bearer ={{$credentials.apiKey}}',
			},
		},
	};
}
