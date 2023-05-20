import {apiCall} from '.';

import {
  GET_ALL_SKILL_ROUTE,
  UPDATE_SKILL_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../constant/apiRoutes';

export type GetUserRequestBody = {};

export type GetUserResponseBody = {};

export const getUserRequest = async (payload: GetUserRequestBody) => {
  const response = await apiCall<any, any>({
    method: 'GET',
    url: USER_PROFILE_ROUTE,
    data: payload,
  });

  return response.data.data as any;
};

export type GetAllSkillRequestBody = {};

export type GetAllSkillResponseBody = {
  data: string[];
};

export const getAllSkillRequest = async (payload: GetAllSkillRequestBody) => {
  const response = await apiCall<any, any>({
    method: 'GET',
    url: GET_ALL_SKILL_ROUTE,
    data: payload,
  });

  const responseData = response.data as GetAllSkillResponseBody;

  return responseData.data;
};

export type UpdateSkillRequestBody = {
  primarySkill: string | null;
  secondarySkill: string | null;
  ternarySkill: string | null;
  otherSkills: string | null;
};

export type UpdateSkillResponseBody = {
  message: any;
};

export const updateSkillRequest = async (payload: UpdateSkillRequestBody) => {
  const response = await apiCall<any, UpdateSkillResponseBody>({
    method: 'POST',
    url: UPDATE_SKILL_ROUTE,
    data: payload,
  });

  return response.data.message as any;
};
