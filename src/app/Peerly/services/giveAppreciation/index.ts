import {
  GET_CORE_VALUES,
  GET_COWORKER_LIST,
  POST_APPRECIATION_ROUTE,
} from '../../constants/apiRoutes';
import {apiCall} from '../api/index';
import {
  GetCoworkersListRequest,
  GetCoworkersListResponse,
  GetCoreValuesResponse,
  PostAppreciationRequestBody,
  PostAppreciationResponse,
} from './types';

export const getCoworkerList = async (payload: GetCoworkersListRequest) => {
  const response = await apiCall<
    GetCoworkersListRequest,
    GetCoworkersListResponse
  >({
    method: 'GET',
    url: `${GET_COWORKER_LIST}?exclude_self=true`,
    params: payload,
  });
  return response.data;
};

export const getCoreValuesList = async () => {
  const response = await apiCall<any, GetCoreValuesResponse>({
    method: 'GET',
    url: GET_CORE_VALUES,
  });
  return response.data;
};

export const postAppreciationRequest = async (
  payload: PostAppreciationRequestBody,
) => {
  const response = await apiCall<
    PostAppreciationRequestBody,
    PostAppreciationResponse
  >({
    method: 'POST',
    url: POST_APPRECIATION_ROUTE,
    data: payload,
  });
  return response.data;
};
