export interface DesignElementvalue {
  assetName: string;
  asset_name?: string; // FROM DATABASE
  assetId: string;
  asset_id?: string; // FROM DATABASE
  time: Date;
  attributeName: string;
  attribute_name?: string; // FROM DATABASE
  value: string;
  measurement?: string;
}
