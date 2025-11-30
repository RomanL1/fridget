import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';
import { ShoppingListItem } from '../../../shopping-list/ShoppingListView';
import { ShoppingListItemResponse } from './shopping-list-items';

export async function saveShoppingListItem(item: ShoppingListItem): Promise<ShoppingListItemResponse> {
  const url = `${API_HOST}/recipe/shopping-list/item`;
  const body = item;

  console.log(body);

  const response = tauriFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { userCode: getUserCode()!, 'Content-type': 'application/json' },
  });

  return await response.then((r) => r.json());
}
