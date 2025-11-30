import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';
import { ShoppingListItemResponse } from './shopping-list-items';

export async function removeShoppingListItem(itemId: string): Promise<ShoppingListItemResponse> {
  const url = `${API_HOST}/recipe/shopping-list/item/${itemId}`;

  const response = tauriFetch(url, {
    method: 'DELETE',
    headers: { userCode: getUserCode()! },
  });

  return await response.then((r) => r.json());
}
