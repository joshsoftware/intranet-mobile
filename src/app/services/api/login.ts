import {User} from '@react-native-google-signin/google-signin';
import {AxiosResponse} from 'axios';

import {apiCall} from '.';
import {LOGIN_ROUTE} from '../../constant/apiRoutes';
import {getNotificationToken} from '../firebase/messaging';

type PayloadType = User | {email: string; password: string};

export type LoginRequestBody = PayloadType & {notificationToken: string};
export type LoginResponseBody = {
  message: string;
  data: {
    jwtToken: string;
    user: {
      id: string;
    };
  };
};

export const sendLoginRequest = async (payload: PayloadType) => {
  const notificationToken = await getNotificationToken();
  const data = {...payload, notificationToken};

  const response = await apiCall<LoginRequestBody, LoginResponseBody>({
    method: 'POST',
    url: LOGIN_ROUTE,
    data: data,
  });

  return response as AxiosResponse<LoginResponseBody>;
};
