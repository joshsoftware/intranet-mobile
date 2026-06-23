import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { loginPeerly } from '../services/api/login';
import { AxiosError } from 'axios';
import { APIError } from '../types';
import toast from '../../utils/toast';
import { PeerlyLoginResponse } from '../services/api/types';
import PeerlyAsyncStore from '../services/peerlyAsyncStorage';

export function useLoginPeerly() {
  const { data, isLoading, isFetching, isSuccess, isError, error, refetch } = useQuery({
    queryKey: ['peerly_login'],
    queryFn: loginPeerly,
    refetchOnMount: true,
  });

  const response = data as PeerlyLoginResponse | undefined;

  useEffect(() => {
    if (isSuccess && response) {
      PeerlyAsyncStore.setItem(
        PeerlyAsyncStore.PEERLY_AUTH_TOKEN_KEY,
        response.data.AuthToken,
      );
    }
  }, [isSuccess, response]);

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast('Something went wrong, Please try after sometime', 'error');
      }
    }
  }, [isError, error]);
  return { data, isLoading, isFetching, isSuccess, isError, refetch };
}
