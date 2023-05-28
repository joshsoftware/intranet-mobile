import {AxiosError} from 'axios';
import {useQuery} from 'react-query';

import {
  getLeaveDetailRequest,
  getLeaveListRequest,
  getAllProjectsRequest,
  getAllUsersRequest,
} from '../../services/api/leave';
import toast from '../../utils/toast';

import {
  ILeaveDetailData,
  ILeaveFilters,
  ILeaveListItemData,
  IUserData,
} from './interface';

export function useLeaveList(filters: ILeaveFilters) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery({
    queryKey: ['leaveList', filters],
    queryFn: async () => getLeaveListRequest(filters),
    onError: (err: AxiosError) => {
      toast(err.message, 'error');
    },
  });

  const responseData: ILeaveListItemData[] | ILeaveDetailData[] =
    data?.data.data.leaves || [];

  return {
    data: responseData,
    isLoading,
    isError,
    error,
    refetch,
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

export function useEmployeeLeaveList(filters: ILeaveFilters) {
  /*
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
    isRefetchError,
  } = useQuery({
    queryKey: ['leaveList', filters],
    queryFn: async () => getLeaveListRequest(filters),
    onError: (err: AxiosError) => {
      toast(err.message, 'error');
    },
  });
  */

  return {
    data: [
      {
        leave_id: 17661,
        emp_user_id: 929,
        emp_name: 'Chetan Satpute',
        leave_from: '2023-05-15',
        leave_to: '2023-05-19',
        leave_approver: 'Shailesh Kalekar',
        days: 5,
        leave_type: 'WFH',
        leave_reason: 'Examination Leave.',
        leave_note: null,
        leave_status: 'Rejected',
      },
      {
        leave_id: 17661,
        emp_user_id: 929,
        emp_name: 'Chetan Satpute',
        leave_from: '2023-05-15',
        leave_to: '2023-05-19',
        leave_approver: 'Shailesh Kalekar',
        days: 5,
        leave_type: 'WFH',
        leave_reason: 'Examination Leave.',
        leave_note: null,
        leave_status: 'Rejected',
      },
    ],
    isLoading: false,
    isError: false,
    error: null,
    refetch: () => {},
    isRefetching: false,
    isRefetchError: false,
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
