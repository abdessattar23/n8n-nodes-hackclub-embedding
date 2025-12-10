import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class HackclubEmbeddingApi implements ICredentialType {
	name = 'hackclubEmbeddingApi';
	displayName = 'Hackclub Embedding API';
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
}
