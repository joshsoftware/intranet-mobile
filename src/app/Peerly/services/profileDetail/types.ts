export type ProfileDetailsDetail = {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image_url: string;
  designation: string;
  reward_quota_balance: number;
  total_reward_quota: number;
  grade_id: number;
  employee_id: number;
  total_points: number;
  refil_date: number;
  badge: string;
  badge_created_at: number;
};

export type GetProfileDetailsResponse = {
  success: boolean;
  message: string;
  status_code: number;
  data: ProfileDetailsDetail;
};
