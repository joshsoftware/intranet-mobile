import {appleAuth} from '@invertase/react-native-apple-authentication';

import toast from '../../utils/toast';
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
        return {
          type: AuthType.APPLE,
          idToken: response.identityToken,
          user: {
            email: response.email,
          },
        };
      case appleAuth.State.REVOKED:
      case appleAuth.State.NOT_FOUND:
      case appleAuth.State.TRANSFERRED:
      default:
        break;
    }
  } catch (error: any) {
    if (error.code !== appleAuth.Error.CANCELED) {
      switch (error.code) {
        case appleAuth.Error.FAILED:
        case appleAuth.Error.INVALID_RESPONSE:
        case appleAuth.Error.NOT_HANDLED:
          toast('Apple sign-in failed. Please try again.', 'error');
          break;
        case appleAuth.Error.UNKNOWN:
        default:
          break;
      }
    }
  }
};
