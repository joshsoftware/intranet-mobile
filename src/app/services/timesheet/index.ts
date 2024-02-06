import {apiCall} from '../api';
import {buildRoute} from '../../utils/apis';

import {
  DELETE_TIMESHEET_ROUTE,
  GET_EMPLOYEE_LIST_ROUTE,
  GET_PROJECT_LIST_ROUTE,
  GET_TIMESHEET_ROUTE,
  MANAGER_TIMESHEET_ACTION_ROUTE,
  POST_TIMESHEET_ROUTE,
  PUT_TIMESHEET_ROUTE,
} from '../../constant/apiRoutes';
import {
  EmployeeTimesheetActionPayload,
  EmployeeTimesheetActionRequestBody,
  IGetTimesheetsResponse,
  ITimesheetResponse,
  TAssignedProjectList,
  TCerateTimsheetResponse,
  TDateRange,
  TDeleteTimesheetRequest,
  TEditTimesheetRquestBody,
  TEmpListTSResponse,
  TimesheetActionRequestBody,
  TimesheetRequestBody,
} from './types';
import {
  Timesheet,
  TimesheetStatus,
} from '../../screens/TimesheetScreen/interface';
import {dateFormate} from '../../utils/date';

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

export const employeeTimesheetAction = async (
  payload: EmployeeTimesheetActionPayload,
) => {
  const body: EmployeeTimesheetActionRequestBody = {
    from_date: dateFormate(payload.from_date),
    to_date: dateFormate(payload.to_date),
    action: payload.action,
    reject_reason: payload.reject_reason,
    users: [],
  };

  body.users = payload.users.reduce((acc, obj) => {
    let statusObj = acc.find(o => o.status === obj.status);

    if (!statusObj) {
      statusObj = {status: obj.status, projects: []};
      acc.push(statusObj);
    }

    let projectObj = statusObj.projects.find(
      o => o.project_id === obj.projectId,
    );

    if (!projectObj) {
      projectObj = {project_id: obj.projectId, user_ids: []};
      statusObj.projects.push(projectObj);
    }

    if (projectObj.user_ids.findIndex(o => o === obj.userId) === -1) {
      projectObj.user_ids.push(obj.userId);
    }

    return acc;
  }, body.users);

  const response = await apiCall<
    EmployeeTimesheetActionRequestBody,
    ITimesheetResponse
  >({
    method: 'PATCH',
    url: GET_EMPLOYEE_LIST_ROUTE,
    data: body,
  });

  return response;
};

export const timesheetAction = async (payload: TimesheetActionRequestBody) => {
  const response = await apiCall<
    TimesheetActionRequestBody,
    ITimesheetResponse
  >({
    method: 'PATCH',
    url: GET_TIMESHEET_ROUTE,
    data: payload,
  });

  return response;
};
