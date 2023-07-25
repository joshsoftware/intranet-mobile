import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';

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

    return userInfo;
  } catch (error: any) {
    googleSignOut();
    if (error === INVALID_EMAIL_ERROR) {
      Alert.alert(
        'Login Error',
        'Only Google accounts from joshsoftware are allowed.',
      );
    } else if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('', 'sign in is in progress already');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('', 'play services not available or outdated');
    } else {
      Alert.alert('', 'Something went wrong');
    }
  }
};

export const googleSignOut = async () => {
  await GoogleSignin.signOut();
};
