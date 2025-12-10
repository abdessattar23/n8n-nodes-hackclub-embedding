import { type INodeType, type INodeTypeDescription, type SupplyData, type ISupplyDataFunctions } from 'n8n-workflow';
export declare class HackclubEmbedding implements INodeType {
    description: INodeTypeDescription;
    supplyData(this: ISupplyDataFunctions, itemIndex: number): Promise<SupplyData>;
}
