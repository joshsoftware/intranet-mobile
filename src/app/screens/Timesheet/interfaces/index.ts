export interface Timesheet {
  timesheet_id: string;
  date: string;
  work_in_hours: string;
  description: string;
}

export interface TimesheetFormData {
  project: string;
  date: Date;
  workHours: string;
  description: string;
}
