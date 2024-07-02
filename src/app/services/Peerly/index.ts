import {apiCall} from '../api';

import {PEERLY_LOGIN_ROUTE} from '../../constant/apiRoutes';
import {IPeerlyLoginResponse} from './types';

// export const loginPeerlySystemRequest = async () => {
//   const response = await apiCall<any, IPeerlyLoginResponse>({
//     method: 'POST',
//     url: PEERLY_LOGIN_ROUTE,
//   });

//   return response;
// };

export const loginPeerlySystemRequest = async () => {
  const response = await apiCall<any, IPeerlyLoginResponse>({
    method: 'GET',
    url: PEERLY_LOGIN_ROUTE,
  });

  return response;
};
