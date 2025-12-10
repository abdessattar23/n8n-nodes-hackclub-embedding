import { Embeddings, type EmbeddingsParams } from '@langchain/core/embeddings';
export interface HackclubEmbeddingsParams extends EmbeddingsParams {
    apiKey: string;
    model: string;
    baseUrl?: string;
    stripNewLines?: boolean;
}
export declare class HackclubEmbeddings extends Embeddings implements HackclubEmbeddingsParams {
    apiKey: string;
    model: string;
    baseUrl: string;
    stripNewLines: boolean;
    constructor(params: HackclubEmbeddingsParams);
    embedDocuments(texts: string[]): Promise<number[][]>;
    embedQuery(text: string): Promise<number[]>;
    private batchTexts;
}
