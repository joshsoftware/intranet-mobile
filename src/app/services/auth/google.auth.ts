import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import toast from '../../utils/toast';
import {AuthType} from '../api/login';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
  iosClientId: Config.IOS_CLIENT_ID,
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    return {
      type: AuthType.GOOGLE,
      idToken: userInfo.idToken,
      user: {
        email: userInfo.user.email,
      },
    };
  } catch (error: any) {
    await googleSignOut();

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      toast('Sign in is in progress already', 'error');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      toast('Google play services not available or outdated', 'error');
    } else {
      toast('Google sign-in failed. Please try again.', 'error');
    }
  }
};

export const googleSignOut = async () => {
  await GoogleSignin.signOut();
};
