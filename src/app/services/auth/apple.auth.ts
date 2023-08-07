import {appleAuth} from '@invertase/react-native-apple-authentication';

const appleSignIn = async () => {
  try {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // // get current authentication state for user
    // // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    // const credentialState = await appleAuth.getCredentialStateForUser(
    //   appleAuthRequestResponse.user,
    // );

    // // use credentialState response to ensure the user is authenticated
    // if (credentialState === appleAuth.State.AUTHORIZED) {
    //   // user is authenticated
    // }

    if (
      appleAuthRequestResponse.identityToken &&
      appleAuthRequestResponse.email
    ) {
      return {
        idToken: appleAuthRequestResponse.identityToken,
        user: {
          email: appleAuthRequestResponse.email,
        },
      };
    }
  } catch (err) {
    console.error(err);
  }
};

export default appleSignIn;
