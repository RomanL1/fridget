import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';

interface SaveInventoryItemRequest {
  productId?: string;
  barcode?: string;
  inventoryItemId?: string;
  productName: string;
  brandName?: string;
  quantity?: string;
  bestBefore?: string;
}

interface SaveInventoryItemResponse {
  inventoryItemId: string;
  productId: string;
  productName: string;
  brandName?: string;
  imageUrl?: string;
  quantity?: string;
  bestBefore?: Date;
}

export async function saveInventoryItem(inventoryItem: SaveInventoryItemRequest): Promise<SaveInventoryItemResponse> {
  const url = `${API_HOST}/inventory-item`;
  const response = tauriFetch(url, {
    method: 'PUT',
    body: JSON.stringify(inventoryItem),
    headers: {
      userCode: getUserCode()!,
      'Content-Type': 'application/json',
    },
  });

  return await response.then((r) => r.json());
}
