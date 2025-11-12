import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';

export async function removeInventoryItem(inventoryItemId: string) {
  const url = `${API_HOST}/inventory-item?id=${inventoryItemId}`;
  await tauriFetch(url, {
    method: 'DELETE',
    headers: { userCode: getUserCode()! },
  });
}
