import {apiCall} from '.';

import {USER_ROUTE} from '../../constant/apiRoutes';

export type GetUserRequestBody = {};

export type GetUserResponseBody = {};

export const getUserRequest = async (payload: GetUserRequestBody) => {
  const response = await apiCall<any, any>({
    method: 'GET',
    url: USER_ROUTE,
    data: payload,
  });

  return response.data.record as any;
};
