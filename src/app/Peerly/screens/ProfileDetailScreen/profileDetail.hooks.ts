import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { APIError } from '../../types';
import toast from '../../../utils/toast';

import { getProfileDetails } from '../../services/profileDetail';

export function useGetProfileDetails(userId?: number) {
  const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['profile_icon', userId],
    queryFn: getProfileDetails,
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching profile details', 'error');
      }
    }
  }, [isError, error]);
  return { data: data?.data, isLoading, isFetching, isSuccess, isError };
}
