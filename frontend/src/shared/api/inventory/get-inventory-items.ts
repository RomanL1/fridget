import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
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
  const url = `${API_HOST}/inventory-item`;
  const response = tauriFetch(url, {
    method: 'GET',
    headers: { userCode: getUserCode()! },
  });

  return await response.then((r) => r.json());
}
