import {apiCall} from '.';
import {LOGOUT_ROUTE} from '../../constant/apiRoutes';
import {getNotificationToken} from '../firebase/messaging';

export type LogoutRequestBody = {
  notificationToken: string;
};

export type LogoutResponseBody = {
  status: string;
  message: string;
};

export const sendLogoutRequest = async () => {
  const notificationToken = await getNotificationToken();

  return apiCall<LogoutRequestBody, LogoutResponseBody>({
    method: 'POST',
    url: LOGOUT_ROUTE,
    data: {notificationToken},
  });
};
