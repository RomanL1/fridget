import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { ShoppingListItemResponse } from './shopping-list-items';
import { API_HOST } from '../../environment/environment';

export async function getShoppingListItems(): Promise<ShoppingListItemResponse> {
  const url = `${API_HOST}/recipe/shopping-list`;

  const response = tauriFetch(url, {
    method: 'GET',
    headers: { userCode: getUserCode()! },
  });

  return await response.then((r) => r.json());
}
