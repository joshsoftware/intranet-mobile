import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import {
  getTimesheetCalendar,
  getTeamMembersUpcomingLeaves,
  getTeamMembersUpcomingBirthdays,
  getLiveEvents,
  getUpcomingEvents,
} from '../../services/home';
import toast from '../../utils/toast';
import { filterWFHFromLeaves } from '../../utils/home';

import { GetHomeTimesheetDataResponse } from '../../services/home/types';

export const useHomeCalendar = (month: string, year: number) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['home_calendar_data', month, year],
    queryFn: () => getTimesheetCalendar(month, year),
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<GetHomeTimesheetDataResponse>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching calendar data', 'error');
      }
    }
  }, [isError, error]);

  return {
    approved: data?.data?.data?.approved || [],
    pending: data?.data?.data?.pending || [],
    rejected: data?.data?.data?.rejected || [],
    not_filled: data?.data?.data?.not_filled || [],
    leaves: data?.data?.data?.leaves || [],
    holidays: data?.data?.data?.holidays || [],
    weekends: data?.data?.data?.weekends || [],
    isLoading,
  };
};

export const useTeamMembersLeaves = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['teamMembersLeaves'],
    queryFn: getTeamMembersUpcomingLeaves,
  });

  return { data: filterWFHFromLeaves(data?.data.data ?? []), isLoading };
};

export const useTeamMembersBirthdays = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['teamMembersBirthdays'],
    queryFn: getTeamMembersUpcomingBirthdays,
  });

  return { data: data?.data.data ?? [], isLoading };
};

export const useUpcomingEvents = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: getUpcomingEvents,
  });

  return {
    events: data?.data?.data || [],
    isLoading: isLoading || isRefetching,
    refetch,
  };
};

export const useLiveEvents = () => {
  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: ['live-events'],
    queryFn: getLiveEvents,
  });

  return {
    events: data?.data?.data || [],
    isLoading: isLoading || isRefetching,
    refetch,
  };
};
