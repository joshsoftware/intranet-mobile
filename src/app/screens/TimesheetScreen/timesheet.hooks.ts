import {useQuery} from 'react-query';

import {getEmployeeListRequest} from '../../services/timesheet/getEmployeeList';
import {dateFormate} from '../../utils/date';
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
