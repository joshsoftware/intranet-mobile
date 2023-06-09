import {apiCall} from '../api';

import {HOME_CALENDAR_ROUTE} from '../../constant/apiRoutes';
import {GetHomeTimesheetDataResponse} from './types';

export const getTimesheetCalendar = async (month: string, year: number) => {
  const response = await apiCall<any, GetHomeTimesheetDataResponse>({
    method: 'GET',
    url: HOME_CALENDAR_ROUTE,
    params: {month, year},
  });

  return response;
};
