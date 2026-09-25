export interface APIError {
  success: boolean;
  message: string;
  status_code?: number;
  code?: number;
  data: null;
}

export type BadgeType = 'platinum' | 'gold' | 'silver' | 'bronze' | 'basicUser';
