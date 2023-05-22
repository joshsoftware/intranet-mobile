import {useContext} from 'react';
import {Alert} from 'react-native';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';

import UserContext, {UserData} from '../../context/user.context';
import AsyncStore from '../../services/asyncStorage';
import {LoginResponseBody, sendLoginRequest} from '../../services/api/login';
import {googleSignIn, googleSignOut} from '../../services/auth/google.auth';

export const useLogin = () => {
  const [, setUserContextData] = useContext(UserContext);

  const mutation = useMutation(sendLoginRequest, {
    onSuccess: async response => {
      const responseData = response.data.data;

      const authToken = responseData.jwtToken;
      const userData: UserData = {
        role: responseData.role,
        userId: responseData.user_id,
      };

      await AsyncStore.setItem(AsyncStore.AUTH_TOKEN_KEY, authToken);
      await AsyncStore.setItem(AsyncStore.USER_DATA, JSON.stringify(userData));

      setUserContextData({authToken, userData});
    },
    onError: async (error: AxiosError<LoginResponseBody>) => {
      await googleSignOut();

      if (error.response) {
        if (error.response.status >= 500) {
          Alert.alert('', 'Server Error: Please try again later.');
        } else {
          const responseData = error.response.data;
          Alert.alert('', responseData.message);
        }
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
