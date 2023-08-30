export interface Employee {
  name: string;
  email: string;
  user_id: string;
}

export type TimesheetStatus = 'Approved' | 'Rejected' | 'Pending';

export interface Timesheet {
  timesheet_id: string;
  date: string;
  work_in_hours: string;
  description: string;
  project?: string;
  project_id: string;
  status: TimesheetStatus;
}

export interface ITimesheetSectionListItem {
  title: string;
  data: Timesheet[];
}
