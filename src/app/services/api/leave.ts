import {apiCall} from '.';
import {LEAVE_DETAIL_ROUTE, LEAVE_LIST_ROUTE} from '../../constant/apiRoutes';
import {
  ILeaveDetailData,
  ILeaveFilters,
  ILeaveListItemData,
} from '../../screens/LeaveScreen/interface';

export type GetLeaveListRequestBody = {};

export type GetLeaveListResponseBody = {
  message: string;
  data: {
    page_no: 0;
    leaves: ILeaveListItemData[];
  };
};

export const getLeaveListRequest = async (filters: ILeaveFilters) => {
  const paramsString =
    '?' +
    Object.entries(filters)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

  const response = await apiCall<
    GetLeaveListRequestBody,
    GetLeaveListResponseBody
  >({
    method: 'GET',
    url: LEAVE_LIST_ROUTE + paramsString,
  });

  return response;
};

export type GetLeaveDetailRequestBody = {};

export type GetLeaveDetailResponseBody = {
  message: string;
  data: ILeaveDetailData;
};

export const getLeaveDetailRequest = async (leaveID: number) => {
  const response = await apiCall<
    GetLeaveDetailRequestBody,
    GetLeaveDetailResponseBody
  >({
    method: 'GET',
    url: LEAVE_DETAIL_ROUTE + `?leave_id=${leaveID}`,
  });

  return response;
};
