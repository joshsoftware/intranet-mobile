import {AxiosResponse} from 'axios';

import {apiCall} from '..';

import {TIMESHEET_ROUTE} from '../../../constant/apiRoutes';

export type DeleteTimesheetRequestBody = {
  timesheet_id: number;
};

export type DeleteTimesheetResponseBody = {
  message: string;
};

export const deleteTimesheetRequest = async (
  payload: DeleteTimesheetRequestBody,
) => {
  const response = await apiCall<
    DeleteTimesheetRequestBody,
    DeleteTimesheetResponseBody
  >({
    method: 'DELETE',
    url: TIMESHEET_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<DeleteTimesheetResponseBody>;
};
