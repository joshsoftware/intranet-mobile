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
import { getTalkItOut } from '../../services/talkItOut';

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

const extractArrayFromResponse = (response: any): any[] => {
  if (!response) return [];
  const resData = response?.data;
  if (Array.isArray(resData)) return resData;
  if (Array.isArray(resData?.data)) return resData.data;
  if (Array.isArray(resData?.leaves)) return resData.leaves;
  if (Array.isArray(resData?.upcoming_leaves)) return resData.upcoming_leaves;
  if (Array.isArray(resData?.data?.leaves)) return resData.data.leaves;
  if (Array.isArray(resData?.data?.upcoming_leaves)) return resData.data.upcoming_leaves;
  if (Array.isArray(resData?.birthdays)) return resData.birthdays;
  if (Array.isArray(resData?.upcoming_birthdays)) return resData.upcoming_birthdays;
  if (Array.isArray(resData?.data?.birthdays)) return resData.data.birthdays;
  if (Array.isArray(resData?.data?.upcoming_birthdays)) return resData.data.upcoming_birthdays;

  if (typeof resData?.data === 'object' && resData?.data !== null) {
    for (const key of Object.keys(resData.data)) {
      if (Array.isArray(resData.data[key])) return resData.data[key];
    }
  }
  if (typeof resData === 'object' && resData !== null) {
    for (const key of Object.keys(resData)) {
      if (Array.isArray(resData[key])) return resData[key];
    }
  }
  return [];
};

export const useTeamMembersLeaves = (params?: {days?: number}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['teamMembersLeaves', params?.days],
    queryFn: () => getTeamMembersUpcomingLeaves(params),
  });

  const rawArray = extractArrayFromResponse(data);
  return { data: filterWFHFromLeaves(rawArray), isLoading };
};

export const useTeamMembersBirthdays = (params?: {days?: number}) => {
  const { data, isLoading } = useQuery({
    queryKey: ['teamMembersBirthdays', params?.days],
    queryFn: () => getTeamMembersUpcomingBirthdays(params),
  });

  const rawArray = extractArrayFromResponse(data);
  return { data: rawArray, isLoading };
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

export const useTalkItOut = () => {
  const {data, isLoading, isRefetching, refetch} = useQuery({
    queryKey: ['talk-it-out'],
    queryFn: getTalkItOut,
  });

  return {
    talkItOut: data?.data?.data,
    isLoading: isLoading || isRefetching,
    refetch,
  };
};

import {
  getFintechSemesterSummary,
  getUserAttendanceSummary,
} from '../../services/fintechQuestions';

export const useFintechSemesterSummary = (params?: {
  start_year?: number;
  start_month?: number;
}) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['fintech-semester-summary', params?.start_year, params?.start_month],
    queryFn: () => getFintechSemesterSummary(params),
  });

  const semesterData = data?.data?.data;

  return {
    semester: semesterData?.semester,
    overallSummary: semesterData?.overall_summary,
    monthlySummary: semesterData?.monthly_summary || [],
    isLoading,
    refetch,
  };
};

export const useAttendanceSummary = (params?: {
  month?: number;
  year?: number;
}) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['attendance-summary', params?.month, params?.year],
    queryFn: () => getUserAttendanceSummary(params),
  });

  const rawData = data?.data?.data;
  const summaryObj = rawData?.summary || rawData;

  const presentDays = summaryObj?.present_days ?? summaryObj?.present_count ?? 0;
  const absentDays = summaryObj?.absent_days ?? summaryObj?.absent_count ?? 0;
  const pendingLeaves = summaryObj?.pending_leaves ?? summaryObj?.pending_leaves_count ?? 0;
  const approvedLeaves = summaryObj?.approved_leaves ?? summaryObj?.approved_leaves_count ?? 0;
  const holidays = summaryObj?.holidays ?? summaryObj?.holidays_count ?? 0;

  return {
    label: rawData?.label,
    presentDays,
    absentDays,
    pendingLeaves,
    approvedLeaves,
    holidays,
    summary: summaryObj,
    rawData,
    isLoading,
    refetch,
  };
};

