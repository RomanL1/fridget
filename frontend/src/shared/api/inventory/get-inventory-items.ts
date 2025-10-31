import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { API_HOST } from '../../environment/environment';

type InventoryItemResponse = {
  inventoryItemId: string;
  productId?: string;
  productName: string;
  brandName?: string;
  imageUrl?: string;
  quantity?: string;
  bestBeforeDate?: Date;
}[];

export async function getInventoryItems(): Promise<InventoryItemResponse> {
  const url = `${API_HOST}/getInventoryItems`;
  const response = tauriFetch(url, {
    method: 'GET',
  });

  return await response.then((r) => r.json());
}
