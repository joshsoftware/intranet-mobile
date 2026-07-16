import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import toast from '../../../utils/toast';

import {
  getTopUsersList,
  getActiveUsersList,
  getAppreciationList,
} from '../../services/home';
import { APIError } from '../../types';
import { GetAppreciationListRequest } from '../../services/home/types';

export function useGetTopUsersList() {
  const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['top_users_list'],
    queryFn: getTopUsersList,
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast(
          'Something went wrong while fetching Leaderboard users list',
          'error',
        );
      }
    }
  }, [isError, error]);
  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}

export function useGetActiveUsersList() {
  const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['active_user_list'],
    queryFn: getActiveUsersList,
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast(
          'Something went wrong while fetching dynamic engagers users list',
          'error',
        );
      }
    }
  }, [isError, error]);
  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}

export function useGetAppreciationList(payload: GetAppreciationListRequest) {
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useQuery({
    queryKey: [
      'appreciation_list',
      payload.page,
      payload.page_size,
      payload.self,
      payload.sort_order,
    ],
    queryFn: () => getAppreciationList(payload),
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching appreciation list', 'error');
      }
    }
  }, [isError, error]);
  return {
    data: data?.data?.appreciations || [],
    metadata: data?.data?.metadata,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
  };
}
