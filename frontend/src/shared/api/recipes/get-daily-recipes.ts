import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { CHEFKOCH_HOST } from '../../environment/environment';
import { RecipeItemResponse } from './recipe-item';

export async function getDailyRecipes(): Promise<RecipeItemResponse> {
  const url = `${CHEFKOCH_HOST}/daily_recipes`;
  const body = {
    limit: 8,
  };

  const response = tauriFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { userCode: getUserCode()!, 'content-type': 'application/json' },
  });

  return await response.then((r) => r.json());
}
