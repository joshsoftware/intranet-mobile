import {apiCall} from '.';
import {dateFormate} from '../../utils/date';

import {
  LEAVE_DETAIL_ROUTE,
  LEAVE_LIST_ROUTE,
  ALL_PROJECTS_ROUTE,
  ALL_USERS_ROUTE,
} from '../../constant/apiRoutes';
import {ISO_DATE_FROMAT} from '../../constant/date';
import {
  ILeaveDetailData,
  ILeaveFilters,
  ILeaveListItemData,
  IProjectData,
  IUserData,
} from '../../screens/LeaveScreen/interface';

export type GetLeaveListRequestBody = {};

export type GetLeaveListResponseBody = {
  message: string;
  data: {
    page_no: number;
    total_pages: number;
    leaves: ILeaveListItemData[];
  };
};

export const getLeaveListRequest = async (
  filters: ILeaveFilters,
  pageNumber?: number,
) => {
  const response = await apiCall<
    GetLeaveListRequestBody,
    GetLeaveListResponseBody
  >({
    method: 'GET',
    url: LEAVE_LIST_ROUTE,
    params: {
      ...filters,
      from: dateFormate(filters.from, ISO_DATE_FROMAT),
      to: dateFormate(filters.to, ISO_DATE_FROMAT),
      page_no: pageNumber || 1,
    },
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

export type GetAllProjectsRequestBody = {};

export type GetAllProjectsResponseBody = {
  message: string;
  data: {
    projects: IProjectData[];
  };
};

export const getAllProjectsRequest = async () => {
  const response = await apiCall<
    GetAllProjectsRequestBody,
    GetAllProjectsResponseBody
  >({
    method: 'GET',
    url: ALL_PROJECTS_ROUTE,
  });

  return response;
};

export type GetUsersRequestBody = {};

export type GetUsersResponseBody = {
  message: string;
  data: {
    users: IUserData[];
  };
};

export const getAllUsersRequest = async () => {
  const response = await apiCall<GetUsersRequestBody, GetUsersResponseBody>({
    method: 'GET',
    url: ALL_USERS_ROUTE,
  });

  return response;
};
