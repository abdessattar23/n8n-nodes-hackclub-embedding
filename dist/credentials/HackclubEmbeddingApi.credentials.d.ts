import type { ICredentialType, ICredentialTestRequest, INodeProperties } from 'n8n-workflow';
export declare class HackclubEmbeddingApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: {
        readonly light: "file:credentials/hackclubEmbedding.svg";
        readonly dark: "file:credentials/hackclubEmbedding.dark.svg";
    };
    documentationUrl: string;
    properties: INodeProperties[];
    test: ICredentialTestRequest;
}
