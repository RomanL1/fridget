import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';

type ShoppingListItemResponse = {
  id: string;
  name: string;
  desription: string;
  bought: boolean;
}[];

export async function getShoppingListItems(): Promise<ShoppingListItemResponse> {
  const url = `${API_HOST}/shopping-list`;

  const response = tauriFetch(url, {
    method: 'GET',
    headers: { userCode: getUserCode()! },
  });

  return await response.then((r) => r.json());
}
