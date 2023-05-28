import {AxiosError} from 'axios';
import {useRef} from 'react';
import {useInfiniteQuery, useQuery} from 'react-query';

import {
  getLeaveDetailRequest,
  getLeaveListRequest,
  getAllProjectsRequest,
  getAllUsersRequest,
} from '../../services/api/leave';
import toast from '../../utils/toast';

import {ILeaveDetailData, ILeaveFilters, ILeaveListItemData} from './interface';

export function useLeaveList(filters: ILeaveFilters) {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isRefetchError,
  } = useInfiniteQuery({
    queryKey: ['leaveList', filters],
    queryFn: async ({pageParam}) => getLeaveListRequest(filters, pageParam),
    getNextPageParam: lastPage => {
      const totalPages = lastPage.data.data.total_pages;
      const lastPageNumber = lastPage.data.data.page_no;

      if (lastPageNumber < totalPages) {
        return lastPageNumber + 1;
      }

      return undefined;
    },
    onError: (err: AxiosError) => {
      toast(err.message, 'error');
    },
  });

  let leaves: ILeaveListItemData[] | ILeaveDetailData[] = [];

  const pages = data?.pages || [];
  leaves =
    pages.reduce((acc, group) => {
      const groupLeaves = (group.data.data.leaves || []) as
        | ILeaveListItemData[]
        | ILeaveDetailData[];

      return [...acc, ...groupLeaves];
    }, leaves) || [];

  return {
    data: leaves,
    isLoading,
    isError,
    error,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
    isRefetchError,
  };
}

export function useLeaveDetail(leaveID: number) {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['leaveDetail', leaveID],
    queryFn: async () => getLeaveDetailRequest(leaveID),
  });

  return {
    data: data?.data.data || [],
    isLoading,
    isError,
  };
}

export function useProjectList() {
  const {data, refetch, isLoading, isError} = useQuery({
    queryKey: ['allProjects'],
    queryFn: async () => getAllProjectsRequest(),
  });

  const projects = data?.data.data.projects || [];

  return {
    data:
      projects.map(({name, project_id}) => ({
        label: name,
        value: project_id,
      })) || [],
    refetch,
    isLoading,
    isError,
  };
}

export function useUserList() {
  const {data, refetch, isLoading, isError} = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => getAllUsersRequest(),
  });

  const projects = data?.data.data.users || [];

  return {
    data:
      projects.map(({name, user_id}) => ({
        label: name,
        value: user_id,
      })) || [],
    refetch,
    isLoading,
    isError,
  };
}

export function useLastCall(callback: (...args: any[]) => void, time: number) {
  const timeoutRef = useRef<number | null>(null);

  return () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(callback, time);
  };
}
