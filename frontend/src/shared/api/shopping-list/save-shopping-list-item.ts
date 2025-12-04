import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';
import { ShoppingListItem } from '../../../shopping-list/ShoppingListView';

type ShoppingListItemResponse = {
  id: string;
  name: string;
  desription: string;
  bought: boolean;
};

export async function saveShoppingListItem(item: ShoppingListItem): Promise<ShoppingListItemResponse> {
  const url = `${API_HOST}/shopping-list/item`;
  const body = item;

  const response = tauriFetch(url, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: { userCode: getUserCode()!, 'Content-type': 'application/json' },
  });

  return response.then((r) => r.json());
}
