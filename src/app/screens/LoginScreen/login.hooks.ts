import {useContext} from 'react';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';

import UserContext, {UserData} from '../../context/user.context';
import AsyncStore from '../../services/asyncStorage';
import {LoginResponseBody, sendLoginRequest} from '../../services/api/login';
import {googleSignIn, googleSignOut} from '../../services/auth/google.auth';
import toast from '../../utils/toast';

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
          toast('Server Error: Please try again later.', 'error');
        } else {
          const responseData = error.response.data;
          toast(responseData.message, 'error');
        }
      } else {
        toast(error.message, 'error');
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
