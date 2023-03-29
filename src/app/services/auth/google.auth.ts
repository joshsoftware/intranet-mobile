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
      return {error: 'user cancelled the login flow'};
    } else if (error.code === statusCodes.IN_PROGRESS) {
      return {error: 'sign in is in progress already'};
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return {error: 'play services not available or outdated'};
    } else {
      return {error: 'Something went wrong'};
    }
  }
};

export const googleSignOut = async () => {
  await GoogleSignin.signOut();
};
