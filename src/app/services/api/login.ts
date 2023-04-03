import {User} from '@react-native-google-signin/google-signin';
import {AxiosResponse} from 'axios';

import {apiCall} from '.';
import {LOGIN_ROUTE} from '../../constant/apiRoutes';

export type LoginRequestBody =
  | User
  | {
      email: string;
      password: string;
    };

export type LoginResponseBody = {
  message: string;
  data: {
    jwtToken: string;
    user: {
      id: string;
    };
  };
};

export const sendLoginRequest = async (payload: LoginRequestBody) => {
  const response = await apiCall<LoginRequestBody, LoginResponseBody>({
    method: 'POST',
    url: LOGIN_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<LoginResponseBody>;
};
