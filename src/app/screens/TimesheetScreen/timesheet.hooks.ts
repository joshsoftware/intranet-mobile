import {AxiosError} from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

import toast from '../../utils/toast';
import {dateFormate, getMonthYearFromISO} from '../../utils/date';
import {
  createTimesheetRequest,
  deleteTimesheetRequest,
  employeeTimesheetAction,
  getEmployeeListRequest,
  getProjectListRequest,
  getTimesheetRequest,
  timesheetAction,
  updateTimesheetRequest,
} from '../../services/timesheet';

import {
  EmployeeTimesheetActionPayload,
  TDeleteTimesheetRequest,
  TEditTimesheetRquestBody,
  TimesheetActionRequestBody,
  TimesheetError,
  TimesheetRequestBody,
} from '../../services/timesheet/types';
import {ISO_DATE_FROMAT} from '../../constant/date';
import {useState} from 'react';
import {TimesheetAction, TimesheetStatus} from './interface';

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
  const queryClient = useQueryClient();

  const [actionType, setActionType] = useState<TimesheetAction>(
    TimesheetAction.Approve,
  );

  const [checkedEmployees, setCheckedEmployees] = useState<
    {userId: string; projectId: number; status: TimesheetStatus}[]
  >([]);

  const [erroredEmployees, setErroredEmployees] = useState<
    {userId: string; projectId: number; status: TimesheetStatus}[]
  >([]);

  const clearAllChecked = () => {
    setCheckedEmployees([]);
    setErroredEmployees([]);
  };

  const {mutate, isLoading} = useMutation(employeeTimesheetAction, {
    onSuccess: data => {
      if (data?.data?.message) {
        toast(data.data.message);
        queryClient.invalidateQueries(['timesheet']);
        clearAllChecked();
      }
    },
    onError: (err: AxiosError) => {
      if (!err.response) {
        return;
      }

      const data = err.response.data as {
        data: {
          error_data: {
            status: TimesheetStatus;
            user_id: string;
            project_id: number;
          }[];
        };
        message: string;
      };

      toast(data.message, 'error');
      const checkedList = data.data.error_data.map(obj => ({
        userId: obj.user_id,
        projectId: obj.project_id,
        status: obj.status,
      }));

      setCheckedEmployees([...checkedList]);
      setErroredEmployees(checkedList);

      queryClient.invalidateQueries(['timesheet']);
    },
  });

  const isEmployeeChecked = (
    userId: string,
    projectId: number,
    status: TimesheetStatus,
  ) => {
    return (
      checkedEmployees.findIndex(
        obj =>
          obj.status === status &&
          obj.userId.toString() === userId.toString() &&
          obj.projectId.toString() === projectId.toString(),
      ) !== -1
    );
  };

  const isErroredEmployee = (
    userId: string,
    projectId: number,
    status: TimesheetStatus,
  ) => {
    return (
      erroredEmployees.findIndex(
        obj =>
          obj.status === status &&
          obj.userId.toString() === userId.toString() &&
          obj.projectId.toString() === projectId.toString(),
      ) !== -1
    );
  };

  const toggleCheckEmployee = (
    userId: string,
    projectId: number,
    status: TimesheetStatus,
  ) => {
    if (isEmployeeChecked(userId, projectId, status)) {
      const filteredCheckedEmployees = checkedEmployees.filter(
        obj =>
          !(
            obj.status === status &&
            obj.userId.toString() === userId.toString() &&
            obj.projectId.toString() === projectId.toString()
          ),
      );
      setCheckedEmployees(filteredCheckedEmployees);

      if (filteredCheckedEmployees.length === 0) {
        setErroredEmployees([]);
      }
    } else {
      setCheckedEmployees([...checkedEmployees, {userId, projectId, status}]);
    }
  };

  const isActionMode = checkedEmployees.length !== 0;

  const performAction = (payload: EmployeeTimesheetActionPayload) => {
    setActionType(payload.action);
    mutate(payload);
  };

  return {
    isApproved: actionType === TimesheetAction.Approve,
    isRejected: actionType === TimesheetAction.Reject,
    checkedEmployees,
    isEmployeeChecked,
    isErroredEmployee,
    isActionMode,
    toggleCheckEmployee,
    performAction,
    clearAllChecked,
    isLoading,
  };
};

export const useTimesheetAction = () => {
  const queryClient = useQueryClient();

  const [actionType, setActionType] = useState<TimesheetAction>(
    TimesheetAction.Approve,
  );

  const [checkedTimesheets, setCheckedTimesheets] = useState<string[]>([]);
  const [erroredTimesheets, setErroredTimesheets] = useState<
    Record<string, string>
  >({});

  const clearAllChecked = () => {
    setCheckedTimesheets([]);
    setErroredTimesheets({});
  };

  const {mutate, isLoading} = useMutation(timesheetAction, {
    onSuccess(data) {
      toast(data.data.message);
      queryClient.invalidateQueries(['timesheet']);
      clearAllChecked();
    },
    onError(error: AxiosError) {
      if (!error.response) {
        return;
      }

      const data = error.response.data as {
        data: {
          error_data: Record<string, string>;
        };
        message: string;
      };

      toast(data.message, 'error');

      setCheckedTimesheets(Object.keys(data.data.error_data));
      setErroredTimesheets(data.data.error_data);

      queryClient.invalidateQueries(['timesheet']);
    },
  });

  const isTimesheetChecked = (timesheetId: string) => {
    return checkedTimesheets.findIndex(id => id === timesheetId) !== -1;
  };

  const toggleCheckTimesheet = (timesheetId: string) => {
    if (isTimesheetChecked(timesheetId)) {
      const filteredCheckedTimesheets = checkedTimesheets.filter(
        id => id !== timesheetId,
      );
      setCheckedTimesheets(filteredCheckedTimesheets);

      if (filteredCheckedTimesheets.length === 0) {
        setErroredTimesheets({});
      }
    } else {
      setCheckedTimesheets([...checkedTimesheets, timesheetId]);
    }
  };

  const performAction = (payload: TimesheetActionRequestBody) => {
    setActionType(payload.action_type);
    mutate(payload);
  };

  const isActionMode = checkedTimesheets.length !== 0;

  return {
    isLoading,
    isApproved: actionType === TimesheetAction.Approve,
    isRejected: actionType === TimesheetAction.Reject,
    checkedTimesheets,
    erroredTimesheets,
    isTimesheetChecked,
    isActionMode,
    toggleCheckTimesheet,
    performAction,
    clearAllChecked,
  };
};
