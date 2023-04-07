import {AxiosResponse} from 'axios';

import {apiCall} from '.';

import {PROJECTS_ROUTE} from '../../constant/apiRoutes';

export type GetProjectsRequestBody = {
  manager_id: number;
  start_date: Date;
  end_date: Date;
  emp_name_initials: string;
};

export type GetProjectsResponseBody = {
  data: {
    projects: {label: number; value: string}[];
  };
};

export const getProjectsRequest = async (payload: GetProjectsRequestBody) => {
  const response = await apiCall<
    GetProjectsRequestBody,
    GetProjectsResponseBody
  >({
    method: 'GET',
    url: PROJECTS_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<GetProjectsResponseBody>;
};
