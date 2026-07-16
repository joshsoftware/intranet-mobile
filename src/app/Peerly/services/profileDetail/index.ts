import {PROFILE_DETAILS_ROUTE} from '../../constants/apiRoutes';
import {apiCall} from '../api/index';
import {GetProfileDetailsResponse} from './types';

export const getProfileDetails = async () => {
  const response = await apiCall<any, GetProfileDetailsResponse>({
    method: 'GET',
    url: PROFILE_DETAILS_ROUTE,
  });
  return response.data;
};
