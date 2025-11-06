import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { API_HOST } from '../../environment/environment';

type ProductFilterResponse = {
  id: string;
  ean13: string;
  brandName?: string;
  name: string;
  quantity?: string;
  category?: string;
  subCategory?: string;
  imageUrl?: string;
}[];

export async function filterProducts(searchTerm: string): Promise<ProductFilterResponse> {
  const url = `${API_HOST}/product?searchTerm?${searchTerm}`;
  const response = tauriFetch(url, {
    method: 'GET',
  });

  return await response.then((r) => r.json());
}
