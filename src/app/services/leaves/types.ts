import {
  ILeaveDetailData,
  ILeaveListItemData,
  IProjectData,
  IUserData,
} from '../../screens/LeaveScreen/interface';

export type GetManagerLeaveListParams = {
  project_id?: number;
  user_id?: number;
  active_or_all_flags: 'active' | 'all';
  from: string;
  leave_type: string;
  pending_flag: boolean;
  to: string;
  page_no: number;
};

export type GetLeaveListResponseBody = {
  message: string;
  data: {
    page_no: number;
    total_pages: number;
    leaves: ILeaveListItemData[];
  };
};

export type GetEmployeesLeaveParams = {
  from: string;
  to: string;
  pending_flag: boolean;
};

export type GetEmployeesLeaveResponse = {
  message: string;
  data: {
    leaves: ILeaveDetailData[];
  };
};

export type GetLeaveDetailRequestBody = {
  leave_id: number;
};

export type GetLeaveDetailResponseBody = {
  message: string;
  data: ILeaveDetailData;
};

export type GetAllProjectsResponseBody = {
  message: string;
  data: {
    projects: IProjectData[];
  };
};

export type GetUsersResponseBody = {
  message: string;
  data: {
    users: IUserData[];
  };
};
