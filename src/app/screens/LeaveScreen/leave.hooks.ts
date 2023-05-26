import {AxiosError} from 'axios';
import {useQuery} from 'react-query';

import {
  getLeaveDetailRequest,
  getLeaveListRequest,
} from '../../services/api/leave';
import toast from '../../utils/toast';

import {ILeaveFilters, IProjectData, IUserData} from './interface';

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

  return {
    data: data?.data.data.leaves,
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
    data: data?.data.data,
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
  // TODO: Sample data
  const data: IProjectData[] = [
    {
      name: 'Intranet',
      project_id: 0,
    },
    {
      name: 'Intern Training',
      project_id: 1,
    },
  ];

  return data.map(({name, project_id}) => ({
    label: name,
    value: project_id,
  }));
}

export function useUserList() {
  // TODO: Sample data
  const data: IUserData[] = [
    {
      name: 'Chetan Satpute',
      email: 'chetan.satpute@joshsoftware.com',
      user_id: 929,
      emp_id: 'JIN0105',
    },
  ];

  return data.map(({name, user_id}) => ({
    label: name,
    value: user_id,
  }));
}
