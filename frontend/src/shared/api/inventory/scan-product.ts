import { fetch as tauriFetch } from '@tauri-apps/plugin-http';
import { getUserCode } from '../../auth';
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
  Complete,
  Incomplete,
}

export async function scanProduct(barcode: string): Promise<ScanProductResponse> {
  const url = `${API_HOST}/scanProduct/${barcode}`;
  const response = tauriFetch(url, {
    method: 'POST',
    headers: { userCode: getUserCode()! },
  });

  return await response.then((r) => r.json());
}
