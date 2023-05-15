import {AxiosResponse} from 'axios';

import {apiCall} from '../api';

import {POST_TIMESHEET_ROUTE} from '../../constant/apiRoutes';
import {SectionListType} from './getTimesheet';

export type CreateTimesheetType = {
  project_id: string;
  date: string;
  duration: string;
  description: string;
};

export type CreateTimesheetRequestBody = {
  user: {
    time_sheets_attributes: any;
    user_id: string;
    current_user: string;
  };
};

export type CreateTimesheetResponseBody = {
  code: number;
  message: string;
  status: string;
  data: SectionListType[];
};

export const createTimesheetRequest = async (
  payload: CreateTimesheetRequestBody,
) => {
  const response = await apiCall<
    CreateTimesheetRequestBody,
    CreateTimesheetResponseBody
  >({
    method: 'POST',
    url: POST_TIMESHEET_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<CreateTimesheetResponseBody>;
};
