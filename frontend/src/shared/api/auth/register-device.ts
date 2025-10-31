import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { API_HOST } from '../../environment/environment';

interface UserCodeResponse {
  userId: string;
}

export async function registerDevice(): Promise<UserCodeResponse> {
  const url = `${API_HOST}/api/register`;
  const response = tauriFetch(url, {
    method: 'POST',
  });

  return await response.then((r) => r.json() as unknown as UserCodeResponse);
}
