import {useMutation, useQuery, useQueryClient} from 'react-query';

import bottomToast from '../../utils/toast';
import {dateFormate} from '../../utils/date';
import {getEmployeeListRequest} from '../../services/timesheet/getEmployeeList';
import {getTimesheetRequest} from '../../services/timesheet/getTimesheet';
import {deleteTimesheetRequest} from '../../services/timesheet/deleteTimesheet';

import {ISO_DATE_FROMAT} from '../../constant/date';
import strings from '../../constant/strings';

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
    (payload: any) => deleteTimesheetRequest(payload),
    {
      onSuccess: successData => {
        bottomToast(successData.data.message);
        queryClient.invalidateQueries(['timesheet']);
      },
      onError: () => bottomToast(strings.DELETE_ERROR, true),
    },
  );

  return {mutate, isLoading};
};
