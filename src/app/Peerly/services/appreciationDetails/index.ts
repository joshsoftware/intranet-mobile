import {
  POST_REWARD_ROUTE,
  POST_OBJECTION_ROUTE,
} from '../../constants/apiRoutes';
import {apiCall} from '../api/index';
import {
  PostRewardRequest,
  PostRewardRequestBody,
  PostRewaredResponse,
  PostObjectionRequest,
  PostObjectionRequestBody,
  PostObjectionResponse,
} from './types';

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
