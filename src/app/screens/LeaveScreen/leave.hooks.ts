import {AxiosError} from 'axios';
import {useInfiniteQuery, useQuery} from 'react-query';

import {dateFormate} from '../../utils/date';
import {
  getManagerLeaveListRequest,
  getLeaveDetailRequest,
  getAllProjectsRequest,
  getAllUsersRequest,
  getEmployeeLeaves,
} from '../../services/leaves';
import toast from '../../utils/toast';

import {ISO_DATE_FROMAT} from '../../constant/date';
import {ILeaveFilters, ILeaveListItemData} from './interface';

export function useManagerLeaveList(filters: ILeaveFilters) {
  const from = dateFormate(filters.from, ISO_DATE_FROMAT);
  const to = dateFormate(filters.to, ISO_DATE_FROMAT);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
    isRefetchError,
  } = useInfiniteQuery({
    queryKey: ['ManagerLeaveList', ...Object.values(filters), from, to],
    queryFn: async ({pageParam}) =>
      getManagerLeaveListRequest({...filters, from, to, page_no: pageParam}),
    getNextPageParam: lastPage => {
      const totalPages = lastPage.data.data.total_pages;
      const lastPageNumber = lastPage.data.data.page_no;

      if (lastPageNumber < totalPages) {
        return lastPageNumber + 1;
      }

      return undefined;
    },
    onError: (err: AxiosError) => {
      const response = err.response?.data as any;
      toast(response.message, 'error');
    },
  });

  let leaves: ILeaveListItemData[] = [];
  const pages = data?.pages || [];

  leaves =
    pages.reduce((acc, group) => {
      const groupLeaves = group.data.data.leaves || [];
      return [...acc, ...groupLeaves];
    }, leaves) || [];

  return {
    data: leaves,
    isLoading,
    isError: isError && !leaves.length,
    error: 'Failed to fetch leaves',
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
    queryFn: async () => getLeaveDetailRequest({leave_id: leaveID}),
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

  const users = data?.data.data.users || [];

  return {
    data:
      users.map(({name, user_id}) => ({
        label: name,
        value: user_id,
      })) || [],
    refetch,
    isLoading,
    isError,
  };
}

export const useLeavesList = (
  initialDate: Date,
  endDate: Date,
  isPendingLeaves: boolean,
) => {
  const from = dateFormate(initialDate, ISO_DATE_FROMAT);
  const to = dateFormate(endDate, ISO_DATE_FROMAT);

  const {data, isLoading, refetch, isError, isRefetching} = useQuery(
    ['employeeLeaves', from, to, isPendingLeaves ? 'pending' : 'history'],
    () => getEmployeeLeaves({from, to, pending_flag: isPendingLeaves}),
  );

  return {
    data: data?.data?.data?.leaves || [],
    isLoading,
    refetch,
    isError,
    isRefetching,
    error: data?.data.message,
  };
};
