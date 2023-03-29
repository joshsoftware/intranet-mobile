import {useContext, useState} from 'react';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';

import UserContext from '../../context/user.context';
import AsyncStore from '../../services/asyncStorage';
import {LoginResponseBody, sendLoginRequest} from '../../services/api/login';
import {googleSignIn} from '../../services/auth/google.auth';

export const useLogin = () => {
  const [, setUserData] = useContext(UserContext);

  const mutation = useMutation(sendLoginRequest, {
    onSuccess: async response => {
      const responseData = response.data;
      const authToken = responseData.data.token;

      await AsyncStore.setAuthToken(authToken);
      setUserData({token: authToken});
    },
    onError: (error: AxiosError<LoginResponseBody>) => {
      if (error.response) {
        const responseData = error.response.data;
        setErrorMessage(responseData.message);
      } else {
        setErrorMessage(error.message);
      }
    },
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signIn = async () => {
    setErrorMessage(null);

    const response = await googleSignIn();

    if ('error' in response) {
      setErrorMessage(response.error);
    } else {
      // User login from backend
      mutation.mutate(response);
    }
  };

  return {
    signIn,
    isLoading: mutation.isLoading,
    errorMessage,
    mutate: mutation.mutate,
  };
};
