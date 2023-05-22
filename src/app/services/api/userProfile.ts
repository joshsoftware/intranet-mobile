import {apiCall} from '.';

import {
  GET_ALL_SKILL_ROUTE,
  UPDATE_SKILL_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../constant/apiRoutes';
import {IUserProfileData} from '../../screens/ProfileScreen/interface';

export type GetUserRequestBody = {};

export type GetUserResponseBody = {
  data: IUserProfileData;
};

export const getUserRequest = async (payload: GetUserRequestBody) => {
  const response = await apiCall<GetUserRequestBody, GetUserResponseBody>({
    method: 'GET',
    url: USER_PROFILE_ROUTE,
    data: payload,
  });

  return response.data.data;
};

export type GetAllSkillRequestBody = {};

export type GetAllSkillResponseBody = {
  data: string[];
};

export const getAllSkillRequest = async (payload: GetAllSkillRequestBody) => {
  const response = await apiCall<
    GetAllSkillRequestBody,
    GetAllSkillResponseBody
  >({
    method: 'GET',
    url: GET_ALL_SKILL_ROUTE,
    data: payload,
  });

  return response.data.data;
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
