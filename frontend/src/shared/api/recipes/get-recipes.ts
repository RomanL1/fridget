import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { Body } from '@tauri-apps/api/http';
import { getUserCode } from '../../auth';
import { CHEFKOCH_HOST } from '../../environment/environment';

type RecipeItemResponse = {
  title: string;
  rating: number;
  originURL: string;
  ratingCount: number;
  imageUrl: string;
}[];

export async function getRecipes(): Promise<RecipeItemResponse> {
  const url = `${CHEFKOCH_HOST}/daily_recipes`;
  const body = {
    limit: 10,
  };

  const response = tauriFetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { userCode: getUserCode()!, 'content-type': 'application/json' },
  });

  return await response.then((r) => r.json());
}
