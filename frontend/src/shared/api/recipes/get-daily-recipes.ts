import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { API_HOST } from '../../environment/environment';
import { RecipeItemResponse } from './recipe-item';

export async function getDailyRecipes(): Promise<RecipeItemResponse> {
  const url = `${API_HOST}/recipe/trending`;

  console.log(url)

  const response = tauriFetch(url, {
    method: 'GET',
    headers: { userCode: getUserCode()!, 'content-type': 'application/json' },
  });

  return await response.then((r) => r.json());
}
  