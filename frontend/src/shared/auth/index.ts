import { registerDevice } from '../api';

const userCodeStorageKey = 'user_code';

export function getUserCode() {
  return localStorage.getItem(userCodeStorageKey);
}

export async function authenticate() {
  if (getUserCode()) {
    return;
  }

  // Register device for the first time
  // and store user code locally
  const { userCode } = await registerDevice();

  localStorage.setItem(userCodeStorageKey, userCode);
}
