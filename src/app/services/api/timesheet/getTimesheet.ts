import {AxiosResponse} from 'axios';

import {apiCall} from '..';

import {TIMESHEET_ROUTE} from '../../../constant/apiRoutes';

export type GetTimesheetRequestBody = {
  from_date: Date;
  page_number: number;
  to_date: Date;
};

export type GetTimesheetResponseBody = {
  message: string;
  data: {
    total_pages: number;
    page_no: number;
    projects: number;
    time: Date;
    total_worked_hours: number;
    leaves: number;
    data: {
      title: string;
      data: {
        timesheet_id: number;
        date: Date;
        description: string;
        work_in_hours: number;
      }[];
    }[];
  };
};

export const getTimesheetRequest = async (payload: GetTimesheetRequestBody) => {
  const response = await apiCall<
    GetTimesheetRequestBody,
    GetTimesheetResponseBody
  >({
    method: 'GET',
    url: TIMESHEET_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<GetTimesheetResponseBody>;
};
