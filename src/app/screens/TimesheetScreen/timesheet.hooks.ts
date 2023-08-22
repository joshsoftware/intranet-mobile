import {AxiosError} from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import toast from '../../utils/toast';
import {dateFormate, getMonthYearFromISO} from '../../utils/date';
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

export const useDeleteTimesheet = (isSelf: boolean) => {
  const queryClient = useQueryClient();

  const {mutate, isLoading} = useMutation(
    (payload: TDeleteTimesheetRequest) => deleteTimesheetRequest(payload),
    {
      onSuccess: (successData, variables) => {
        toast(successData.data.message);

        if (isSelf && variables.time_sheet_date) {
          const {month, year} = getMonthYearFromISO(variables.time_sheet_date);
          queryClient.invalidateQueries(['home_calendar_data', month, year]);
        }

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

  const {mutate, isLoading, isSuccess, data, reset} = useMutation(
    (payload: TEditTimesheetRquestBody) => updateTimesheetRequest(payload),
    {
      onSuccess: (_, variables) => {
        const {month, year} = getMonthYearFromISO(
          variables.time_sheets_attributes.date,
        );

        queryClient.invalidateQueries(['home_calendar_data', month, year]);
        queryClient.invalidateQueries(['timesheet']);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as TimesheetError;
        toast(error.message || 'Failed to edit the timesheet.', 'error');
      },
    },
  );
  return {mutate, isLoading, isSuccess, message: data?.data.message, reset};
};

export const useAddTimesheet = () => {
  const queryClient = useQueryClient();

  const {mutate, data, isLoading, isSuccess, reset} = useMutation(
    (payload: TimesheetRequestBody) => createTimesheetRequest(payload),
    {
      onSuccess: (_, variables) => {
        const monthYearSet = new Set<string>();

        variables.time_sheets_attributes.forEach(({date}) => {
          const {month, year} = getMonthYearFromISO(date);

          if (!monthYearSet.has(month + year)) {
            queryClient.invalidateQueries(['home_calendar_data', month, year]);
            monthYearSet.add(month + year);
          }
        });

        queryClient.invalidateQueries(['timesheet']);
      },
      onError: (err: AxiosError) => {
        const error = err.response?.data as TimesheetError;
        toast(error.message || 'Failed to add the timesheet.', 'error');
      },
    },
  );

  const isEmpty = !Object.keys(data?.data.data ?? {}).length;

  return {
    mutate,
    isLoading,
    isSuccess: isSuccess && isEmpty,
    isPartiallyFailed: isSuccess && !isEmpty,
    failedTimesheets: data?.data.data,
    message: data?.data.message,
    reset,
  };
};
