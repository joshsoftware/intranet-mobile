export interface Employee {
  name: string;
  email: string;
  user_id: string;
}

export interface Timesheet {
  timesheet_id: string;
  date: string;
  work_in_hours: string;
  description: string;
  project?: string;
  project_id: string;
}

export interface ITimesheetSectionListItem {
  title: string;
  data: Timesheet[];
}
