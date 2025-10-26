export interface InventoryItem {
  inventoryItemId: number;
  productId?: number;
  productName: string;
  brandName: string;
  imageUrl?: string;
  quantity?: string;
  bestBeforeDate?: Date;
}
