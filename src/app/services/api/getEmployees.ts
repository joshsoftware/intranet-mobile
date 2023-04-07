import {AxiosResponse} from 'axios';

import {apiCall} from '.';

import {EMPLOYEES_UNDER_MANAGER_ROUTE} from '../../constant/apiRoutes';

export type GetEmployeesRequestBody = {
  manager_id: number;
  start_date: Date;
  end_date: Date;
  emp_name_initials: string;
};

export type GetEmployeesResponseBody = {
  data: {
    employees: {
      emp_id: string;
      emp_name: string;
      emp_email: string;
    }[];
  };
};

export const getEmployeesRequest = async (payload: GetEmployeesRequestBody) => {
  const response = await apiCall<
    GetEmployeesRequestBody,
    GetEmployeesResponseBody
  >({
    method: 'GET',
    url: EMPLOYEES_UNDER_MANAGER_ROUTE,
    data: payload,
  });

  return response as AxiosResponse<GetEmployeesResponseBody>;
};
