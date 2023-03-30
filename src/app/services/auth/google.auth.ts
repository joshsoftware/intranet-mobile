import {Alert} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {WEB_CLIENT_ID} from '@env';

console.log(WEB_CLIENT_ID);

GoogleSignin.configure({
  webClientId: WEB_CLIENT_ID,
});

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    return userInfo;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert('', 'user cancelled the login flow');
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
