import {useQuery} from 'react-query';

import {getTimesheetCalendar} from '../../services/home';

export const useHomeCalendar = (month: string, year: number) => {
  const {data, isLoading} = useQuery({
    queryKey: ['home_calendar_data', month, year],
    queryFn: async () => getTimesheetCalendar(month, year),
    onError: error => {
      console.log(error);
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
