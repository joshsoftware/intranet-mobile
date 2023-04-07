import {AxiosResponse} from 'axios';

import {apiCall} from '..';

import {TIMESHEET_ROUTE} from '../../../constant/apiRoutes';

export type CreateTimesheetRequestBody = {
  data: {
    date: Date;
    project_name: string;
    Project_id: number;
    description: string;
    Work_in_hours: number;
  }[];
};

export type CreateTimesheetResponseBody = {
  message: string;
};

export const createTimesheetRequest = async (
  payload: CreateTimesheetRequestBody,
) => {
  const response = await apiCall<
    CreateTimesheetRequestBody,
    CreateTimesheetResponseBody
  >({
    method: 'POST',
    url: TIMESHEET_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<CreateTimesheetResponseBody>;
};
