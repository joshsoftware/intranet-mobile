import {useQuery} from 'react-query';
import {AxiosError} from 'axios';

import toast from '../../../utils/toast';

import {
  getProfileDetails,
  getTopUsersList,
  getActiveUsersList,
  getAppreciationList,
} from '../../../services/PeerlyServices/home';
import {APIError} from '../types';

export function useGetProfileDetails() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['profile_icon'],
    queryFn: getProfileDetails,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching profile details', 'error');
      }
    },
  });
  return {data: data?.data, isLoading, isFetching, isSuccess, isError};
}

export function useGetTopUsersList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['top_users_list'],
    queryFn: getTopUsersList,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching top 10 users list', 'error');
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
        toast('Something went wrong while fetching active users list', 'error');
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

export function useGetAppreciationList() {
  const {data, isLoading, isFetching, isSuccess, isError} = useQuery({
    queryKey: ['appreciation_list'],
    queryFn: getAppreciationList,
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching appreciation list', 'error');
      }
    },
  });
  return {data: data?.data || [], isLoading, isFetching, isSuccess, isError};
}
