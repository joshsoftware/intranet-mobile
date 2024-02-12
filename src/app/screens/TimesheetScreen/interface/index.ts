export interface Employee {
  name: string;
  email: string;
  user_id: string;
  worked_minutes: number;
}

export interface Timesheet {
  time_sheet_id: string;
  date: string;
  description: string;
  worked_minutes: number;
  project_id: string;
  is_freezed?: boolean;
}

export interface ITimesheetSectionListItem {
  title: string;
  data: (Timesheet & {project: string})[];
}

export enum TimesheetStatus {
  Pending = 'Pending',
  ReviewPending = 'Review-Pending',
  RejectedPending = 'Rejected-Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum TimesheetStatusFilter {
  All = 'All',
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum TimesheetAction {
  Approve = 'Approved',
  Reject = 'Rejected',
}
