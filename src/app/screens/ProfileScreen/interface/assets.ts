export interface IAsset {
  name: string;
  startDate: string | null;
  endDate?: string | null;
  isActive?: boolean;
}

export interface IAssetData {
  currentAsset: IAsset[];
  previousAsset: IAsset[];
}
