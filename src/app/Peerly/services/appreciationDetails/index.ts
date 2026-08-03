import {
  POST_REWARD_ROUTE,
  POST_OBJECTION_ROUTE,
  GET_APPRECIATION_DETAILS_ROUTE,
} from '../../constants/apiRoutes';
import {apiCall} from '../api/index';
import {AppreciationDetails} from '../home/types';
import {
  GetAppreciationByIdResponse,
  PostRewardRequest,
  PostRewardRequestBody,
  PostRewaredResponse,
  PostObjectionRequest,
  PostObjectionRequestBody,
  PostObjectionResponse,
} from './types';

export const getAppreciationById = async (id: number) => {
  const response = await apiCall<any, GetAppreciationByIdResponse>({
    method: 'GET',
    url: `${GET_APPRECIATION_DETAILS_ROUTE}/${id}`,
  });
  return response.data.data as AppreciationDetails;
};

export const postReward = async (payload: PostRewardRequest) => {
  const {body, params} = payload;
  const response = await apiCall<PostRewardRequestBody, PostRewaredResponse>({
    method: 'POST',
    url: `${POST_REWARD_ROUTE}/${params.id}`,
    data: body,
  });
  return response.data;
};

export const postObjection = async (payload: PostObjectionRequest) => {
  const {body, params} = payload;
  const response = await apiCall<
    PostObjectionRequestBody,
    PostObjectionResponse
  >({
    method: 'POST',
    url: `${POST_OBJECTION_ROUTE}/${params.id}`,
    data: body,
  });
  return response.data;
};
