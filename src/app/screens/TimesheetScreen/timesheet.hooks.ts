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
import {useState} from 'react';
import {TimesheetStatus} from './interface';

export const useEmployees = (startDate: Date, endDate: Date) => {
  const fromDate = dateFormate(startDate, ISO_DATE_FROMAT);
  const toDate = dateFormate(endDate, ISO_DATE_FROMAT);

  const {data, isLoading, refetch, isRefetching} = useQuery(
    ['timesheet', 'employee', fromDate, toDate],
    () =>
      getEmployeeListRequest({
        from_date: fromDate,
        to_date: toDate,
      }),
  );

  return {data: data?.data?.data, isLoading, refetch, isRefetching};
};

export const useTimesheets = (
  userId: string,
  startDate: Date,
  endDate: Date,
) => {
  const fromDate = dateFormate(startDate, ISO_DATE_FROMAT);
  const toDate = dateFormate(endDate, ISO_DATE_FROMAT);

  const {data, isRefetching, refetch, isLoading} = useQuery(
    ['timesheet', userId, startDate, endDate],
    () =>
      getTimesheetRequest({
        user_id: userId,
        from_date: fromDate,
        to_date: toDate,
      }),
  );

  return {data: data?.data?.data, refetch, isRefetching, isLoading};
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

export const useEmployeeTimesheetAction = () => {
  const [checkedEmployees, setCheckedEmployees] = useState<
    {userId: string; projectId: number; status: TimesheetStatus}[]
  >([]);

  const isEmployeeChecked = (
    userId: string,
    projectId: number,
    status: TimesheetStatus,
  ) => {
    return (
      checkedEmployees.findIndex(
        obj =>
          obj.status === status &&
          obj.userId === userId &&
          obj.projectId === projectId,
      ) !== -1
    );
  };

  const toggleCheckEmployee = (
    userId: string,
    projectId: number,
    status: TimesheetStatus,
  ) => {
    if (isEmployeeChecked(userId, projectId, status)) {
      setCheckedEmployees(
        checkedEmployees.filter(
          obj =>
            !(
              obj.status === status &&
              obj.userId === userId &&
              obj.projectId === projectId
            ),
        ),
      );
    } else {
      setCheckedEmployees([...checkedEmployees, {userId, projectId, status}]);
    }
  };

  return {isEmployeeChecked, toggleCheckEmployee};
};

export const useTimesheetAction = () => {
  const [checkedTimesheets, setCheckedTimesheets] = useState<string[]>([]);

  const isTimesheetChecked = (timesheetId: string) => {
    return checkedTimesheets.findIndex(id => id === timesheetId) !== -1;
  };

  const toggleCheckTimesheet = (timesheetId: string) => {
    if (isTimesheetChecked(timesheetId)) {
      setCheckedTimesheets(checkedTimesheets.filter(id => id !== timesheetId));
    } else {
      setCheckedTimesheets([...checkedTimesheets, timesheetId]);
    }
  };

  return {isTimesheetChecked, toggleCheckTimesheet};
};
