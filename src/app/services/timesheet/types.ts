export interface Employee {
  name: string;
  email: string;
  user_id: string;
}

export type Timesheet = {
  project_id: string;
  date: string;
  duration: string;
  description: string;
  timesheet_id?: string;
  id?: string;
};

export type TDateRange = {
  from_date: string;
  to_date: string;
};

export type TSelectData = {
  label: string;
  value: string;
};

export interface ITimesheetSectionList {
  title: string;
  data: Timesheet[];
}

export type TimesheetRequestBody = {
  user: {
    time_sheets_attributes: {
      [key: string]: Timesheet;
    };
    user_id: string;
  };
};

export type TDeleteTimesheetRequest = {
  time_sheet_date?: string;
  user_id?: string;
  project_id?: string;
  timesheet_id: string;
};

export interface ITimesheetResponse {
  code: number;
  message: string;
  status: string;
}

export type TCerateTimsheetResponse = ITimesheetResponse & {
  data: ITimesheetSectionList[];
};

export type TEmpListTSResponse = ITimesheetResponse & {
  data: Employee[];
};

export type TAssignedProjectList = {data: TSelectData[]};

type GetTimesheetAPIData = {
  projects: number;
  total_work: string;
  leaves: number;
  data: ITimesheetSectionList[];
};

export type IGetTimesheetsResponse = ITimesheetResponse & {
  data: GetTimesheetAPIData[];
};
