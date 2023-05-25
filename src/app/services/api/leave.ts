import {apiCall} from '.';

import {
  LEAVE_DETAIL_ROUTE,
  LEAVE_LIST_EMPLOYEES_ROUTE,
} from '../../constant/apiRoutes';
import {
  ILeaveDetailData,
  ILeaveFilters,
  ILeaveListItemData,
} from '../../screens/LeaveScreen/interface';

export type GetLeaveListRequestBody = {};

export type GetLeaveListResponseBody = {
  message: string;
  data: {
    page_no: number;
    leaves: ILeaveListItemData[];
  };
};

export const getLeaveListRequest = async (filters: ILeaveFilters) => {
  const response = await apiCall<
    GetLeaveListRequestBody,
    GetLeaveListResponseBody
  >({
    method: 'GET',
    url: LEAVE_LIST_EMPLOYEES_ROUTE,
    params: filters,
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
    url: LEAVE_DETAIL_ROUTE,
    params: {leave_id: leaveID},
  });

  return response;
};
