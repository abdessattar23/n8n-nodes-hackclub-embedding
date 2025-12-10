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
		console.log('[HackclubEmbeddings] Initialized with model:', this.model);
		console.log('[HackclubEmbeddings] Base URL:', this.baseUrl);
		console.log('[HackclubEmbeddings] Strip new lines:', this.stripNewLines);
	}

	async embedDocuments(texts: string[]): Promise<number[][]> {
		console.log('[HackclubEmbeddings] Embedding documents, count:', texts.length);
		const batches = this.batchTexts(texts);
		console.log('[HackclubEmbeddings] Split into', batches.length, 'batches');
		const embeddings: number[][] = [];

		for (let i = 0; i < batches.length; i++) {
			const batch = batches[i];
			console.log(`[HackclubEmbeddings] Processing batch ${i + 1}/${batches.length}, size: ${batch.length}`);

			try {
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
				console.log(`[HackclubEmbeddings] Batch ${i + 1} completed, received ${responseData.data.length} embeddings`);
			} catch (error) {
				console.error(`[HackclubEmbeddings] Error in batch ${i + 1}:`, error);
				if (axios.isAxiosError(error)) {
					console.error('[HackclubEmbeddings] Response status:', error.response?.status);
					console.error('[HackclubEmbeddings] Response data:', error.response?.data);
				}
				throw error;
			}
		}

		console.log('[HackclubEmbeddings] Total embeddings generated:', embeddings.length);
		return embeddings;
	}

	async embedQuery(text: string): Promise<number[]> {
		console.log('[HackclubEmbeddings] Embedding single query, length:', text.length);
		const embeddings = await this.embedDocuments([text]);
		return embeddings[0];
	}

	private batchTexts(texts: string[], batchSize = 512): string[][] {
		const processedTexts = this.stripNewLines
			? texts.map((text) => text.replace(/\n/g, ' '))
			: texts;

		if (this.stripNewLines) {
			console.log('[HackclubEmbeddings] Stripped new lines from texts');
		}

		const batches: string[][] = [];
		for (let i = 0; i < processedTexts.length; i += batchSize) {
			batches.push(processedTexts.slice(i, i + batchSize));
		}
		return batches;
	}
}
