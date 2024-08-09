import {useQuery} from 'react-query';
import {AxiosError} from 'axios';

import toast from '../../../utils/toast';

import {
  getTopUsersList,
  getActiveUsersList,
  getAppreciationList,
} from '../../services/home';
import {APIError} from '../../types';
import {GetAppreciationListRequest} from '../../services/home/types';

export function useGetTopUsersList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['top_users_list'],
    queryFn: getTopUsersList,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast(
          'Something went wrong while fetching Leaderboard users list',
          'error',
        );
      }
    },
  });
  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}

export function useGetActiveUsersList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['active_user_list'],
    queryFn: getActiveUsersList,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast(
          'Something went wrong while fetching dynamic engagers users list',
          'error',
        );
      }
    },
  });
  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    isSuccess,
    isError,
  };
}

export function useGetAppreciationList(payload: GetAppreciationListRequest) {
  const {data, isLoading, isFetching, isSuccess, isError, refetch} = useQuery({
    queryKey: [
      'appreciation_list',
      payload.page,
      payload.page_size,
      payload.self,
      payload.sort_order,
    ],
    queryFn: () => getAppreciationList(payload),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching appreciation list', 'error');
      }
    },
  });
  return {
    data: data?.data.appreciations || [],
    metadata: data?.data.metadata,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    refetch,
  };
}
