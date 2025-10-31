import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { API_HOST } from '../../environment/environment';

interface ScanProductResponse {
  status: ScanProductResponseStatus;
  productId?: string;
  brandName?: string;
  productName?: string;
  quantity?: string;
  imageUrl?: string;
}

export enum ScanProductResponseStatus {
  Found = 0,
  Created = 1,
  Incomplete = 2,
}

export async function scanProduct(barcode: string): Promise<ScanProductResponse> {
  const url = `${API_HOST}/scanProduct/${barcode}`;
  const response = tauriFetch(url, {
    method: 'POST',
  });

  return await response.then((r) => r.json());
}
