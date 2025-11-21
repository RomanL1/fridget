import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
import { RecipeItemResponse } from './recipe-item';
import { API_HOST } from '../../environment/environment';

export async function getRecipes(ingredients: (string | undefined)[] | null): Promise<RecipeItemResponse> {
  const url = `${API_HOST}/recipe/filtered`;
  const body = {
    ingredients: ingredients,
  };

  const response = tauriFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { userCode: getUserCode()!, 'content-type': 'application/json' },
  });

  return await response.then((r) => r.json());
}
