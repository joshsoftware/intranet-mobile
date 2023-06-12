import {useQuery} from 'react-query';
import {AxiosError} from 'axios';

import {getTimesheetCalendar} from '../../services/home';
import toast from '../../utils/toast';

import {GetHomeTimesheetDataResponse} from '../../services/home/types';

export const useHomeCalendar = (month: string, year: number) => {
  const {data, isLoading} = useQuery({
    queryKey: ['home_calendar_data', month, year],
    queryFn: () => getTimesheetCalendar(month, year),
    onError: (error: AxiosError<GetHomeTimesheetDataResponse>) => {
      if (error.response?.data.message) {
        toast(error.response.data.message, 'error');
      } else {
        toast('Something went wrong while fetching calendar data', 'error');
      }
    },
  });

  return {
    filled: data?.data.data.filled || [],
    notFilled: data?.data.data.not_filled || [],
    incompleteFilled: data?.data.data.incomplete_filled || [],
    leaves: data?.data.data.leaves || [],
    holidays: data?.data.data.holidays || [],
    isLoading,
  };
};
