import {appleAuth} from '@invertase/react-native-apple-authentication';

import toast from '../../utils/toast';
import {logEvent} from '../firebase/analytics';
import {AuthType} from '../api/login';

export const appleSignIn = async () => {
  try {
    if (!appleAuth.isSupported) {
      toast('Apple Authentication is not supported on this device.', 'error');
      return;
    }

    // performs login request
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      response.user,
    );

    switch (credentialState) {
      case appleAuth.State.AUTHORIZED:
        await logEvent('APPLE_SIGNIN_SUCCESS', {
          idToken: response.identityToken,
          email: response.email,
        });

        return {
          type: AuthType.APPLE,
          idToken: response.identityToken,
          user: {
            email: response.email,
          },
        };
      case appleAuth.State.REVOKED:
        await logEvent('APPLE_AUTHORIZATION_FAILED', {state: 'Revoked'});
        break;
      case appleAuth.State.NOT_FOUND:
        await logEvent('APPLE_AUTHORIZATION_FAILED', {state: 'Not Found'});
        break;
      case appleAuth.State.TRANSFERRED:
        await logEvent('APPLE_AUTHORIZATION_FAILED', {state: 'Transferred'});
        break;
      default:
        await logEvent('APPLE_AUTHORIZATION_FAILED', {state: 'Unknown'});
        break;
    }
  } catch (error: any) {
    if (error.code !== appleAuth.Error.CANCELED) {
      let codeName = 'Unknown';

      switch (error.code) {
        case appleAuth.Error.FAILED:
          toast('Apple sign-in failed. Please try again.', 'error');
          codeName = 'Failed';
          break;
        case appleAuth.Error.INVALID_RESPONSE:
          codeName = 'Invalid Response';
          toast('Apple sign-in failed. Please try again.', 'error');
          break;
        case appleAuth.Error.NOT_HANDLED:
          codeName = 'Not Handled';
          toast('Apple sign-in failed. Please try again.', 'error');
          break;
        case appleAuth.Error.UNKNOWN:
        default:
          codeName = 'Unknown';
          break;
      }

      await logEvent('APPLE_SIGNIN_FAILED', {
        code: codeName,
        message: error.message,
      });
    }
  }
};
