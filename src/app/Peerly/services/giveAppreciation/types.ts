export type GetCoworkersListRequest = {
  page: number;
  page_size: number;
};

export type UserDetails = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
};

export type GetCoworkersListResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    user_list: UserDetails[];
    metadata: {
      total_count: number;
      page: number;
      page_size: number;
    };
  };
};

export type CoreValue = {
  id: number;
  name: string;
  description: string;
  parent_core_value_id: number;
};

export type GetCoreValuesResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: CoreValue[];
};

export type PostAppreciationRequestBody = {
  receiver: number;
  core_value_id: number;
  description: string;
};

export type PostAppreciationResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    id: number;
    core_value_id: number;
    description: string;
    quarter: number;
    sender: number;
    receiver: number;
    created_at: number;
    updated_at: number;
  };
};
