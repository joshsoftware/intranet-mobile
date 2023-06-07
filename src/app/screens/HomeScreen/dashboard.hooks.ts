import {useQuery} from 'react-query';

import {getTeamMembersUpcomingLeaves} from '../../services/home';

export const useTeamMembersLeaves = () => {
  const {data, isLoading} = useQuery(
    ['teamMembersLeaves'],
    getTeamMembersUpcomingLeaves,
  );

  return {data: data?.data.data ?? [], isLoading};
};
