import {AxiosError} from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import toast from '../../utils/toast';
import {dateFormate} from '../../utils/date';
import {
  createTimesheetRequest,
  deleteTimesheetRequest,
  getEmployeeListRequest,
  getProjectListRequest,
  getTimesheetRequest,
  updateTimesheetRequest,
} from '../../services/timesheet';

import {
  TDeleteTimesheetRequest,
  TEditTimesheetRquestBody,
  TimesheetError,
  TimesheetRequestBody,
} from '../../services/timesheet/types';
import {ISO_DATE_FROMAT} from '../../constant/date';

export const useEmployees = (startDate: Date, endDate: Date) => {
  const fromDate = dateFormate(startDate, ISO_DATE_FROMAT);
  const toDate = dateFormate(endDate, ISO_DATE_FROMAT);

  const {data, isLoading, refetch} = useQuery(
    ['timesheet', 'employee', fromDate, toDate],
    () =>
      getEmployeeListRequest({
        from_date: fromDate,
        to_date: toDate,
      }),
  );
  return {data: data?.data?.data ?? [], isLoading, refetch};
};

export const useTimesheets = (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  const fromDate = dateFormate(startDate, ISO_DATE_FROMAT);
  const toDate = dateFormate(endDate, ISO_DATE_FROMAT);

  const {data, isFetching, refetch} = useQuery(
    ['timesheet', userId, startDate, endDate],
    () =>
      getTimesheetRequest({
        user_id: userId,
        from_date: fromDate,
        to_date: toDate,
      }),
  );

  return {data: data?.data?.data[0], refetch, isFetching};
};

export const useDeleteTimesheet = () => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(
    (payload: TDeleteTimesheetRequest) => deleteTimesheetRequest(payload),
    {
      onSuccess: successData => {
        toast(successData.data.message);
        queryClient.invalidateQueries(['timesheet']);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as TimesheetError;
        toast(error.message || 'Failed to delete timesheet.', 'error');
      },
    },
  );

  return {mutate, isLoading};
};

export const useAssignedProjects = (userId: string) => {
  const {data, isLoading} = useQuery(
    ['assigned-projects', userId],
    () => getProjectListRequest({user_id: userId}),
    {
      onError: (err: AxiosError) => {
        const error = err.response?.data as TimesheetError;
        toast(error.message || 'Failed to fetch the projects.', 'error');
      },
    },
  );

  return {
    data: data?.data?.data ?? [],
    isLoading,
  };
};

export const useEditTimesheet = () => {
  const queryClient = useQueryClient();

  const {mutate, isLoading, isSuccess} = useMutation(
    (payload: TEditTimesheetRquestBody) => updateTimesheetRequest(payload),
    {
      onSuccess: data => {
        toast(data.data.message);
        queryClient.invalidateQueries(['timesheet']);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as TimesheetError;
        toast(error.message || 'Failed to edit the timesheet.', 'error');
      },
    },
  );
  return {mutate, isLoading, isSuccess};
};

export const useAddTimesheet = () => {
  const queryClient = useQueryClient();

  const {mutate, data, isLoading, isSuccess} = useMutation(
    (payload: TimesheetRequestBody) => createTimesheetRequest(payload),
    {
      onSuccess: successData => {
        toast(successData?.data?.message);
        queryClient.invalidateQueries(['timesheet']);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as TimesheetError;
        toast(error.message || 'Failed to add the timesheet.', 'error');
      },
    },
  );

  const isPartiallyFailed = isSuccess && Boolean(data?.data.data.length);

  return {
    mutate,
    isLoading,
    isSuccess: isSuccess && !data?.data.data.length,
    isPartiallyFailed,
    failedTimesheets: data?.data.data,
    errorMessage: data?.data.message,
  };
};
