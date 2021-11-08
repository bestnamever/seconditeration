import { AssetType } from "./asset-type";

export interface ComponentType {
    componentTitle: string,
    iconCode: string,
    componentType: string
    assetType: AssetType[]
}