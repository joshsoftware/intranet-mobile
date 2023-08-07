import {AxiosResponse} from 'axios';

import {apiCall} from '.';
import {LOGIN_ROUTE} from '../../constant/apiRoutes';
// import {getNotificationToken} from '../firebase/messaging';
import {UserRole} from '../../context/user.context';

type PayloadType =
  | {
      idToken: string;
      user: {
        email: string;
      };
    }
  | {email: string; password: string};

export type LoginRequestBody = PayloadType & {
  notificationToken: string;
};

export type LoginResponseBody = {
  message: string;
  data: {
    jwtToken: string;
    role: UserRole;
    user_id: string;
  };
};

export const sendLoginRequest = async (payload: PayloadType) => {
  // const notificationToken = await getNotificationToken();
  const notificationToken = '';
  const data: LoginRequestBody = {...payload, notificationToken};

  const response = await apiCall<LoginRequestBody, LoginResponseBody>({
    method: 'POST',
    url: LOGIN_ROUTE,
    data: data,
  });

  return response as AxiosResponse<LoginResponseBody>;
};
