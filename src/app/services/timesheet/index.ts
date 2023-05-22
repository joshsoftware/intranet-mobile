import {apiCall} from '../api';
import {buildRoute} from '../../utils/apis';

import {
  DELETE_TIMESHEET_ROUTE,
  GET_EMPLOYEE_LIST_ROUTE,
  GET_PROJECT_LIST_ROUTE,
  GET_TIMESHEET_ROUTE,
  POST_TIMESHEET_ROUTE,
  PUT_TIMESHEET_ROUTE,
} from '../../constant/apiRoutes';
import {
  IGetTimesheetsResponse,
  ITimesheetResponse,
  TAssignedProjectList,
  TCerateTimsheetResponse,
  TDateRange,
  TDeleteTimesheetRequest,
  TEditTimesheetRquestBody,
  TEmpListTSResponse,
  TimesheetRequestBody,
} from './types';

export const createTimesheetRequest = async (payload: TimesheetRequestBody) => {
  const response = await apiCall<TimesheetRequestBody, TCerateTimsheetResponse>(
    {
      method: 'POST',
      url: POST_TIMESHEET_ROUTE,
      data: payload,
    },
  );

  return response;
};

export const deleteTimesheetRequest = async (
  payload: TDeleteTimesheetRequest,
) => {
  const response = await apiCall<TDeleteTimesheetRequest, ITimesheetResponse>({
    method: 'DELETE',
    url: DELETE_TIMESHEET_ROUTE,
    data: payload,
  });

  return response;
};

export const getEmployeeListRequest = async (payload: TDateRange) => {
  const response = await apiCall<TDateRange, TEmpListTSResponse>({
    method: 'GET',
    url: GET_EMPLOYEE_LIST_ROUTE,
    params: payload,
  });

  return response;
};

export const getProjectListRequest = async (payload: {user_id: string}) => {
  const response = await apiCall<{user_id: string}, TAssignedProjectList>({
    method: 'GET',
    url: buildRoute(GET_PROJECT_LIST_ROUTE, payload),
  });

  return response;
};

export const getTimesheetRequest = async (
  payload: TDateRange & {user_id: string},
) => {
  const response = await apiCall<
    TDateRange & {user_id: string},
    IGetTimesheetsResponse
  >({
    method: 'GET',
    url: GET_TIMESHEET_ROUTE,
    params: payload,
  });

  return response;
};

export const updateTimesheetRequest = async (
  payload: TEditTimesheetRquestBody,
) => {
  const response = await apiCall<TEditTimesheetRquestBody, ITimesheetResponse>({
    method: 'PUT',
    url: PUT_TIMESHEET_ROUTE,
    data: payload,
  });

  return response;
};
