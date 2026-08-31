import AsyncStore from '../asyncStorage';
import {sendLogoutRequest} from '../api/logout';
import {googleSignOut} from './google.auth';

export const logoutIntranet = async () => {
  try {
    await sendLogoutRequest();
  } catch {
    // Continue local logout even if the server request fails.
  }

  await googleSignOut();
  await AsyncStore.removeItem(AsyncStore.AUTH_TOKEN_KEY);
  await AsyncStore.removeItem(AsyncStore.USER_DATA);
};
