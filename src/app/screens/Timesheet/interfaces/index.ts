export interface Timesheet {
  timesheet_id: string;
  date: string;
  work_in_hours: string;
  description: string;
  project?: string;
  project_id?: string;
}

export interface TimesheetFormData {
  project: string;
  project_id?: string;
  date: Date;
  workHours: string;
  description: string;
}
