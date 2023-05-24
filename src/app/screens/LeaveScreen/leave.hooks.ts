import {useQuery} from 'react-query';

import {
  getLeaveDetailRequest,
  getLeaveListRequest,
} from '../../services/api/leave';

import {ILeaveFilters} from './interface';

export function useLeaveList(filters: ILeaveFilters) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['leaveList', filters],
    queryFn: async () => getLeaveListRequest(filters),
  });

  return {
    data: data?.data.data.leaves,
    isLoading,
    isError,
  };
}

export function useLeaveDetail(leaveID: number) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['leaveDetail', leaveID],
    queryFn: async () => getLeaveDetailRequest(leaveID),
  });

  return {
    data: data?.data.data,
    isLoading,
    isError,
  };
}
