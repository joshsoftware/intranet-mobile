import {useContext} from 'react';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';

import UserContext from '../../context/user.context';
import AsyncStore from '../../services/asyncStorage';
import {LoginResponseBody, sendLoginRequest} from '../../services/api/login';
import {googleSignIn, googleSignOut} from '../../services/auth/google.auth';
import {Alert} from 'react-native';

export const useLogin = () => {
  const [, setUserData] = useContext(UserContext);

  const mutation = useMutation(sendLoginRequest, {
    onSuccess: async response => {
      const responseData = response.data;
      const authToken = responseData.data.jwtToken;

      await AsyncStore.setItem(AsyncStore.AUTH_TOKEN_KEY, authToken);
      setUserData({token: authToken});
    },
    onError: async (error: AxiosError<LoginResponseBody>) => {
      await googleSignOut();

      if (error.response) {
        const responseData = error.response.data;
        Alert.alert('', responseData.message);
      } else {
        Alert.alert('', error.message);
      }
    },
  });

  const emailPasswordSignInHandler = (email: string, password: string) => {
    // User login from backend
    mutation.mutate({email, password});
  };

  const googleSignInHandler = async () => {
    const response = await googleSignIn();

    if (response) {
      // User login from backend
      mutation.mutate(response);
    }
  };

  return {
    googleSignInHandler,
    emailPasswordSignInHandler,
    isLoading: mutation.isLoading,
    mutate: mutation.mutate,
  };
};
