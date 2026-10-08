import {useQuery} from '@tanstack/react-query';
import {getCourses} from './index';

export const useCourses = () => {
  const {data, isLoading, isRefetching, refetch} = useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
  });

  const coursesList = data?.data?.data || [];
  const completedCount = coursesList.filter((c: any) => c.status === 'completed').length;
  const pendingCount = coursesList.filter((c: any) => c.status === 'pending').length;
  const totalCount = coursesList.length;

  return {
    courses: coursesList,
    completedCount,
    pendingCount,
    totalCount,
    isLoading: isLoading || isRefetching,
    refetch,
  };
};
