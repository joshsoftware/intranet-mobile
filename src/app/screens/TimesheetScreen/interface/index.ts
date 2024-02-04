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
  project: string;
}

export interface ITimesheetSectionListItem {
  title: string;
  data: Timesheet[];
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
