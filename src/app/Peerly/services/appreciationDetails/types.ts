export type PostRewardRequest = {
  params: {
    id: number;
  };
  body: {point: number};
};

export type PostRewardRequestBody = {point: number};

export type PostRewaredResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    id: number;
    appreciation_id: number;
    point: number;
    sender: number;
    created_at: number;
  };
};

export type PostObjectionRequest = {
  params: {
    id: number;
  };
  body: {reporting_comment: string};
};

export type PostObjectionRequestBody = {
  reporting_comment: string;
};

export type PostObjectionResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: {
    id: number;
    appreciation_id: number;
    reporting_comment: string;
    reported_by: number;
    reported_at: number;
  };
};
