import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  getCoreValuesList,
  getCoworkerList,
  postAppreciationRequest,
} from '../../services/giveAppreciation';
import {
  PostAppreciationRequestBody,
  GetCoworkersListRequest,
  UserDetails,
  CoreValue,
} from '../../services/giveAppreciation/types';
import toast from '../../../utils/toast';
import { AxiosError } from 'axios';
import { APIError } from './types';

export function useGetCoworkerList(payload: GetCoworkersListRequest) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['coworker_list'],
    queryFn: () => getCoworkerList(payload),
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching co-workers list', 'error');
      }
    }
  }, [isError, error]);

  let coworkerList = data?.data?.user_list?.map((item: UserDetails) => {
    return {
      label: `${item.first_name} ${item.last_name}`,
      value: String(item.id),
    };
  });

  return { data: coworkerList || [], isLoading, isError };
}

export function useGetCoreValuesList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['profile_core_values'],
    queryFn: getCoreValuesList,
  });

  useEffect(() => {
    if (isError) {
      const axiosError = error as AxiosError<APIError>;
      if (axiosError.response?.data.message) {
        toast(axiosError.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching core values', 'error');
      }
    }
  }, [isError, error]);

  let coreKeyValueList = data?.data?.map((item: CoreValue) => {
    return {
      label: item.name,
      value: String(item.id),
    };
  });

  return {
    data: data?.data || [],
    coreKeyValueList: coreKeyValueList || [],
    isLoading,
    isError,
  };
}

export function usePostAppreciation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['post_appreciation'],
    mutationFn: (payload: PostAppreciationRequestBody) =>
      postAppreciationRequest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appreciation_list'] });
      queryClient.invalidateQueries({ queryKey: ['top_users_list'] });
      queryClient.invalidateQueries({ queryKey: ['active_user_list'] });
    },
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while giving appreciation', 'error');
      }
    },
  });
}
