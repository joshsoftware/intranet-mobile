import {
  GET_ACTIVE_USERS_ROUTE,
  GET_APPRECIATION_LIST_ROUTE,
  GET_TOP_USERS_ROUTE,
} from '../../constants/apiRoutes';
import {apiCall} from '../api/index';
import {
  GetActiveOrTopUsersListResponse,
  GetAppreciationListResponse,
  GetAppreciationListRequest,
} from './types';

export const getTopUsersList = async () => {
  const response = await apiCall<any, GetActiveOrTopUsersListResponse>({
    method: 'GET',
    url: GET_TOP_USERS_ROUTE,
  });
  return response.data;
};

export const getActiveUsersList = async () => {
  const date = new Date();
  const month = date.getMonth();
  const shiftedMonth = (month - 2 + 12) % 12;
  const quarter = Math.floor(shiftedMonth / 3) + 1;
  const year = month < 2 ? date.getFullYear() - 1 : date.getFullYear();

  const response = await apiCall<any, GetActiveOrTopUsersListResponse>({
    method: 'GET',
    url: GET_ACTIVE_USERS_ROUTE,
    params: {
      quarter,
      year,
    },
  });
  return response.data;
};

export const getAppreciationList = async (
  payload: GetAppreciationListRequest,
) => {
  const response = await apiCall<
    GetAppreciationListRequest,
    GetAppreciationListResponse
  >({
    method: 'GET',
    url: GET_APPRECIATION_LIST_ROUTE,
    params: payload,
  });
  return response.data;
};
