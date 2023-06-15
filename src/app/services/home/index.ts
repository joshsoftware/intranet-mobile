import {apiCall} from '../api';

import {
  HOME_CALENDAR_ROUTE,
  TEAM_MEMBERS_UPCOMING_BIRTHDAYS_ROUTE,
  TEAM_MEMBERS_UPCOMING_LEAVES_ROUTE,
} from '../../constant/apiRoutes';
import {
  GetHomeTimesheetDataResponse,
  GetTeamMembersBirthdaysResponse,
  GetTeamMembersLeavesResponse,
} from './types';

export const getTimesheetCalendar = async (month: string, year: number) => {
  const response = await apiCall<any, GetHomeTimesheetDataResponse>({
    method: 'GET',
    url: HOME_CALENDAR_ROUTE,
    params: {month, year},
  });

  return response;
};

export const getTeamMembersUpcomingLeaves = async () => {
  const response = await apiCall<any, GetTeamMembersLeavesResponse>({
    method: 'GET',
    url: TEAM_MEMBERS_UPCOMING_LEAVES_ROUTE,
  });

  return response;
};

export const getTeamMembersUpcomingBirthdays = async () => {
  const response = await apiCall<any, GetTeamMembersBirthdaysResponse>({
    method: 'GET',
    url: TEAM_MEMBERS_UPCOMING_BIRTHDAYS_ROUTE,
  });

  return response;
};
