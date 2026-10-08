import {LiveEvent, UpcomingEvent} from '../../screens/HomeScreen/types';

export type GetHomeTimesheetDataResponse = {
  message: string;
  data: {
    approved: string[];
    pending: string[];
    rejected: string[];
    not_filled: string[];
    leaves: string[];
    holidays: string[];
    weekends: string[];
  };
};

export type UpcomingLeaveMember = {
  id: string;
  user_id?: string;
  user_name?: string;
  name?: string;
  avatar_url?: string;
  designation?: string;
  leave_type?: string;
  start_date?: string;
  end_date?: string;
  total_days?: number;
  reason?: string;
  from?: string;
  to?: string;
  date_range?: string;
  days?: number;
  emp_id?: string;
};

export type GetTeamMembersLeavesResponse = {
  status?: string;
  message?: string;
  data: UpcomingLeaveMember[];
};

export type UpcomingBirthdayMember = {
  id?: string;
  user_name?: string;
  name?: string;
  avatar_url?: string;
  designation?: string;
  date_of_birth?: string;
  date?: string;
  display_date?: string;
  status_tag?: string;
  dob?: string;
  birthday?: string;
};

export type GetTeamMembersBirthdaysResponse = {
  status?: string;
  message?: string;
  data: UpcomingBirthdayMember[];
};

export type GetLiveEventsResponse = {
  message: string;
  data: LiveEvent[];
};

export type GetUpcomingEventsResponse = {
  message: string;
  data: UpcomingEvent[];
};
