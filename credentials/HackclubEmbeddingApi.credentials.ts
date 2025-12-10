import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';

export class HackclubEmbeddingApi implements ICredentialType {
	name = 'hackclubEmbeddingApi';
	displayName = 'Hackclub Embedding API';
	icon = 'file:hackclubEmbedding.svg'; // Relative to THIS file's directory
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
			url: '/models',
			headers: {
				Authorization: 'Bearer ={{$credentials.apiKey}}',
			},
		},
	};
}
