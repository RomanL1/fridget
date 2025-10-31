import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { API_HOST } from '../../environment/environment';

export async function removeInventoryItem(inventoryItemId: string) {
  const url = `${API_HOST}/removeInventoryItem/${inventoryItemId}`;
  await tauriFetch(url, {
    method: 'DELETE',
  });
}
