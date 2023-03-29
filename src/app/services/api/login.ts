import {User} from '@react-native-google-signin/google-signin';
import {AxiosResponse} from 'axios';

import {apiCall} from '.';

export type LoginRequestBody = User;

export type LoginResponseBody = {
  message: string;
  data: {
    token: string;
    user: {
      id: string;
    };
  };
};

export const sendLoginRequest = async (payload: LoginRequestBody) => {
  const response = await apiCall<LoginRequestBody, LoginResponseBody>({
    method: 'POST',
    url: '/login',
    data: payload,
  });

  return response as AxiosResponse<LoginResponseBody>;
};
