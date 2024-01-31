export interface Employee {
  name: string;
  email: string;
  user_id: string;
  worked_minutes: number;
}

export type Timesheet = {
  project_id: string | number;
  date: string;
  duration: string | number;
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
  time_sheets_attributes: Timesheet[];
  user_id: string;
};

export type TEditTimesheetRquestBody = {
  time_sheets_attributes: Timesheet;
  user_id: string;
};

export type TDeleteTimesheetRequest = {
  time_sheet_date?: string;
  user_id?: string;
  project_id?: string;
  timesheet_id: string;
};

export interface ITimesheetResponse {
  message: string;
}

export type TCerateTimsheetResponse = ITimesheetResponse & {
  data: {[key: string]: string[]};
};

export type TEmpListTSResponse = {
  message: string;
  data: {
    user_id: string;
    name: string;
    email: string;
    worked_minutes: number;
    user_data: {
      status: string;
      projects: {
        title: string;
        users: Employee[];
      }[];
    }[];
  };
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

export type TimesheetError = {
  status: string;
  code: number | string;
  message: string;
};
