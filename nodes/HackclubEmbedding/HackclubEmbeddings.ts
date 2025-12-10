import { Embeddings, type EmbeddingsParams } from '@langchain/core/embeddings';
import axios from 'axios';

export interface HackclubEmbeddingsParams extends EmbeddingsParams {
	apiKey: string;
	model: string;
	baseUrl?: string;
	stripNewLines?: boolean;
}

interface EmbeddingResponse {
	data: Array<{ embedding: number[] }>;
}

export class HackclubEmbeddings extends Embeddings implements HackclubEmbeddingsParams {
	apiKey: string;
	model: string;
	baseUrl: string;
	stripNewLines: boolean;

	constructor(params: HackclubEmbeddingsParams) {
		super(params);
		this.apiKey = params.apiKey;
		this.model = params.model;
		this.baseUrl = params.baseUrl || 'https://ai.hackclub.com/proxy/v1';
		this.stripNewLines = params.stripNewLines ?? true;
	}

	async embedDocuments(texts: string[]): Promise<number[][]> {
		const batches = this.batchTexts(texts);
		const embeddings: number[][] = [];

		for (const batch of batches) {
			const response = await axios.post(
				`${this.baseUrl}/embeddings`,
				{
					input: batch,
					model: this.model,
				},
				{
					headers: {
						Authorization: `Bearer ${this.apiKey}`,
					},
				}
			);
			const responseData = response.data as EmbeddingResponse;
			embeddings.push(...responseData.data.map((item) => item.embedding));
		}

		return embeddings;
	}

	async embedQuery(text: string): Promise<number[]> {
		const embeddings = await this.embedDocuments([text]);
		return embeddings[0];
	}

	private batchTexts(texts: string[], batchSize = 512): string[][] {
		const processedTexts = this.stripNewLines
			? texts.map((text) => text.replace(/\n/g, ' '))
			: texts;

		const batches: string[][] = [];
		for (let i = 0; i < processedTexts.length; i += batchSize) {
			batches.push(processedTexts.slice(i, i + batchSize));
		}
		return batches;
	}
}
