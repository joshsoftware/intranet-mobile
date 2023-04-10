import {apiCall} from '.';

import {
  GET_ALL_SKILL_ROUTE,
  UPDATE_SKILL_ROUTE,
  USER_ROUTE,
} from '../../constant/apiRoutes';

export type GetUserRequestBody = {};

export type GetUserResponseBody = {};

export const getUserRequest = async (payload: GetUserRequestBody) => {
  const response = await apiCall<any, any>({
    method: 'GET',
    url: USER_ROUTE,
    data: payload,
  });

  return response.data.record as any;
};

export type GetAllSkillRequestBody = {};

export type GetAllSkillResponseBody = {};

export const getAllSkillRequest = async (payload: GetAllSkillRequestBody) => {
  const response = await apiCall<any, any>({
    method: 'GET',
    url: GET_ALL_SKILL_ROUTE,
    data: payload,
  });

  console.log('Response: ', response.data);

  return response.data.record as any;
};

export type UpdateSkillRequestBody = {
  primarySkill: string | null;
  secondarySkill: string | null;
  ternarySkill: string | null;
  otherSkills: string | null;
};

export type UpdateSkillResponseBody = {};

export const updateSkillRequest = async (payload: UpdateSkillRequestBody) => {
  const response = await apiCall<any, any>({
    method: 'POST',
    url: UPDATE_SKILL_ROUTE,
    data: payload,
  });

  return response.data as any;
};
