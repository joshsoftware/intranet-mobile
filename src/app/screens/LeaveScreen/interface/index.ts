export interface ILeaveListItemData {
  leave_id: number;
  emp_user_id: number;
  emp_name: string;
  leave_from: string;
  leave_to: string;
  days: number;
  leave_type: string;
}

export interface ILeaveDetailData {
  leave_id: number;
  emp_user_id: number;
  emp_name: string;
  leave_from: string;
  leave_to: string;
  leave_approver: string;
  days: number;
  leave_type: string;
  leave_reason: string | null;
  leave_note: string | null;
  leave_status: string | null;
}

export interface ILeaveFilters {
  project_id?: number;
  user_id?: number;
  active_or_all_flags?: string;
  from?: string;
  page_no?: string;
  leave_type?: string;
  pending_flag?: string;
  to?: string;
}
