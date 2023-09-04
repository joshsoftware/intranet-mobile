import {appleAuth} from '@invertase/react-native-apple-authentication';

import AsyncStore from '../asyncStorage';
import toast from '../../utils/toast';
import {logEvent} from '../firebase/analytics';
import {AuthType} from '../api/login';

export const appleSignIn = async () => {
  try {
    // performs login request
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    await logEvent('APPLE_SIGNIN_SUCCESS', response);

    let {identityToken, email} = response;

    // Apple returns user info only on first login
    // So we store email in persistent storage
    if (email) {
      await AsyncStore.setItem(AsyncStore.APPLE_USER_EMAIL_ID, email);
    } else {
      email = await AsyncStore.getItem(AsyncStore.APPLE_USER_EMAIL_ID);
    }

    if (identityToken && email) {
      return {
        type: AuthType.APPLE,
        idToken: identityToken,
        user: {
          email: email,
        },
      };
    } else {
      toast('Something Went Wrong!', 'error');
    }
  } catch (err: any) {
    await logEvent('APPLE_SIGNIN_FAILED', err);
    console.error(err);
    toast('Something Went Wrong!', 'error');
  }
};
