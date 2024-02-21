import {useQuery} from 'react-query';
import {AxiosError} from 'axios';

import {
  getTimesheetCalendar,
  getTeamMembersUpcomingLeaves,
  getTeamMembersUpcomingBirthdays,
} from '../../services/home';
import toast from '../../utils/toast';
import {filterWFHFromLeaves} from '../../utils/home';

import {GetHomeTimesheetDataResponse} from '../../services/home/types';

export const useHomeCalendar = (month: string, year: number) => {
  const {data, isLoading} = useQuery({
    queryKey: ['home_calendar_data', month, year],
    queryFn: () => getTimesheetCalendar(month, year),
    onError: (error: AxiosError<GetHomeTimesheetDataResponse>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching calendar data', 'error');
      }
    },
  });

  return {
    approved: data?.data?.data?.approved || [],
    pending: data?.data?.data?.pending || [],
    rejected: data?.data?.data?.rejected || [],
    not_filled: data?.data?.data?.not_filled || [],
    leaves: data?.data?.data?.leaves || [],
    holidays: data?.data?.data?.holidays || [],
    isLoading,
  };
};

export const useTeamMembersLeaves = () => {
  const {data, isLoading} = useQuery(
    ['teamMembersLeaves'],
    getTeamMembersUpcomingLeaves,
  );

  return {data: filterWFHFromLeaves(data?.data.data ?? []), isLoading};
};

export const useTeamMembersBirthdays = () => {
  const {data, isLoading} = useQuery(
    ['teamMembersBirthdays'],
    getTeamMembersUpcomingBirthdays,
  );

  return {data: data?.data.data ?? [], isLoading};
};
