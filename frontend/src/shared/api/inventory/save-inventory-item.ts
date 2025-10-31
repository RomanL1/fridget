import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { API_HOST } from '../../environment/environment';

interface SaveInventoryItemRequest {
  inventoryItemId?: string;
  productId?: string;
  productName: string;
  brandName?: string;
  quantity?: string;
  bestBeforeDate?: Date;
}

interface SaveInventoryItemResponse {
  inventoryItemId: string;
  productId: string;
  productName: string;
  brandName?: string;
  imageUrl?: string;
  quantity?: string;
  bestBeforeDate?: Date;
}

export async function saveInventoryItem(inventoryItem: SaveInventoryItemRequest): Promise<SaveInventoryItemResponse> {
  const url = `${API_HOST}/saveInventoryItem`;
  const response = tauriFetch(url, {
    method: 'POST',
    body: JSON.stringify(inventoryItem),
  });

  return await response.then((r) => r.json());
}
