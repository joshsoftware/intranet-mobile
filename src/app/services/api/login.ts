import {AxiosResponse} from 'axios';

import {apiCall} from '.';
import {EMAIL_OTP, LOGIN_ROUTE} from '../../constant/apiRoutes';
// import {getNotificationToken} from '../firebase/messaging';
import {UserRole} from '../../context/user.context';

export enum AuthType {
  OTP = 'otp',
  GOOGLE = 'google',
  APPLE = 'apple',
}

export enum IntranetErrorCode {
  PRIVATE_EMAIL = 'PRIVATE_EMAIL',
  PERSONAL_EMAIL = 'PERSONAL_EMAIL',
  ABSENT_IN_DATABASE = 'ABSENT_IN_DATABASE',
  MISSING_EMAIL = 'MISSING_EMAIL',
}

type PayloadType =
  | {
      type: AuthType;
      idToken: string | null;
      user: {
        email: string | null;
      };
    }
  | {type: AuthType; email: string; otp: string};

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

export type LoginErrorResponseBody = {
  message: string;
  data: {
    code: IntranetErrorCode;
    type: AuthType;
    email: string;
  };
};

export const sendLoginRequest = async (payload: PayloadType) => {
  // const notificationToken = await getNotificationToken();

  const data: LoginRequestBody = {
    ...payload,
    notificationToken: '',
  };

  const response = await apiCall<LoginRequestBody, LoginResponseBody>({
    method: 'POST',
    url: LOGIN_ROUTE,
    data: data,
  });

  return response as AxiosResponse<LoginResponseBody>;
};

interface GeneratteOTPRequestBody {
  type: string;
  email: string;
}

interface GenerateOTPResponseBody {
  message: string;
}

export const sendGenerateOTPRequest = async (
  payload: GeneratteOTPRequestBody,
) => {
  const response = await apiCall<
    GeneratteOTPRequestBody,
    GenerateOTPResponseBody
  >({
    method: 'POST',
    url: EMAIL_OTP,
    data: payload,
  });

  return response as AxiosResponse<GenerateOTPResponseBody>;
};
