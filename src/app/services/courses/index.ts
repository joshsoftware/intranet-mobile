import {apiCall} from '../api';
import {COURSES_ROUTE} from '../../constant/apiRoutes';
import {GetCoursesResponse} from './types';

export const getCourses = async () => {
  const response = await apiCall<any, GetCoursesResponse>({
    method: 'GET',
    url: COURSES_ROUTE,
  });

  return response;
};
