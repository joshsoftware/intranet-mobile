import {apiCall} from '../api';

import {
  LEAVE_DETAIL_ROUTE,
  ALL_PROJECTS_ROUTE,
  ALL_USERS_ROUTE,
  MANAGER_LEAVE_LIST_ROUTE,
  LEAVE_LIST_ROUTE,
} from '../../constant/apiRoutes';
import {
  GetAllProjectsResponseBody,
  GetLeaveDetailRequestBody,
  GetLeaveDetailResponseBody,
  GetManagerLeaveListParams,
  GetLeaveListResponseBody,
  GetUsersResponseBody,
  GetEmployeesLeaveParams,
  GetEmployeesLeaveResponse,
} from './types';

export const getManagerLeaveListRequest = async (
  payload: GetManagerLeaveListParams,
) => {
  const response = await apiCall<
    GetManagerLeaveListParams,
    GetLeaveListResponseBody
  >({
    method: 'GET',
    url: MANAGER_LEAVE_LIST_ROUTE,
    params: payload,
  });

  return response;
};

export const getLeaveDetailRequest = async (
  payload: GetLeaveDetailRequestBody,
) => {
  const response = await apiCall<
    GetLeaveDetailRequestBody,
    GetLeaveDetailResponseBody
  >({
    method: 'GET',
    url: LEAVE_DETAIL_ROUTE,
    params: payload,
  });

  return response;
};

export const getAllProjectsRequest = async () => {
  const response = await apiCall<any, GetAllProjectsResponseBody>({
    method: 'GET',
    url: ALL_PROJECTS_ROUTE,
  });

  return response;
};

export const getAllUsersRequest = async () => {
  const response = await apiCall<any, GetUsersResponseBody>({
    method: 'GET',
    url: ALL_USERS_ROUTE,
  });

  return response;
};

export const getEmployeeLeaves = async (payload: GetEmployeesLeaveParams) => {
  const response = await apiCall<
    GetEmployeesLeaveParams,
    GetEmployeesLeaveResponse
  >({
    method: 'GET',
    url: LEAVE_LIST_ROUTE,
    params: payload,
  });

  return response;
};
