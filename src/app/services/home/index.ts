import {apiCall} from '../api';

import {GetTeamMembersLeavesResponse} from './types';
import {TEAM_MEMBERS_UPCOMING_LEAVES_ROUTE} from '../../constant/apiRoutes';

export const getTeamMembersUpcomingLeaves = async () => {
  const response = await apiCall<any, GetTeamMembersLeavesResponse>({
    method: 'GET',
    url: TEAM_MEMBERS_UPCOMING_LEAVES_ROUTE,
  });

  return response;
};
