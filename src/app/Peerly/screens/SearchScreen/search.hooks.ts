import { AxiosError } from 'axios';
import { getAppreciationList } from '../../services/home';
import { GetAppreciationListRequest, GetAppreciationListResponse } from '../../services/home/types';
import { APIError } from '../../types';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import toast from '../../../utils/toast';

export function useGetSearchAppreciationList(
  payload: GetAppreciationListRequest,
) {
  const { data, isLoading, isFetching, isSuccess, isError, error } = useQuery<GetAppreciationListResponse, AxiosError<APIError>>({
    queryKey: ['Search_appriciation_list', payload.name],
    enabled: !!payload.name,
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
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}
