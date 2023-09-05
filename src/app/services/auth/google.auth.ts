import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

import toast from '../../utils/toast';
import {logEvent} from '../firebase/analytics';
import {AuthType} from '../api/login';

import {INVALID_EMAIL_ERROR} from '../../constant/message';

GoogleSignin.configure({
  webClientId: Config.WEB_CLIENT_ID,
  iosClientId: Config.IOS_CLIENT_ID,
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (!userInfo.user.email.endsWith('@joshsoftware.com')) {
      throw INVALID_EMAIL_ERROR;
    }

    await logEvent('GOOGLE_SIGNIN_SUCCESS', userInfo);
    return {
      type: AuthType.GOOGLE,
      idToken: userInfo.idToken || '',
      user: {
        email: userInfo.user.email,
      },
    };
  } catch (error: any) {
    await logEvent('GOOGLE_SIGNIN_FAILED', error);
    googleSignOut();
    if (error === INVALID_EMAIL_ERROR) {
      Alert.alert(
        'Login Error',
        'Only Google accounts from joshsoftware are allowed.',
      );
    } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
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
