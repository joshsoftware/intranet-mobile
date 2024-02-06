import {Timesheet, TimesheetStatus} from '../../screens/TimesheetScreen/interface';

export interface Employee {
  name: string;
  email: string;
  user_id: string;
  worked_minutes: number;
}

// export type Timesheet = {
//   project_id: string | number;
//   date: string;
//   duration: string | number;
//   description: string;
//   timesheet_id?: string;
//   id?: string;
// };

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
        id: number;
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

export type IGetTimesheetsResponse = {
  message: string;
  data: {
    user_id: string;
    user_name: string;
    user_email: string;
    time_sheet_data: {
      status: string;
      worked_minutes: number;
      project_count: number;
      projects: {
        project: string;
        timesheets: Timesheet[];
      }[];
    }[];
  };
};

export type TimesheetError = {
  status: string;
  code: number | string;
  message: string;
};

export interface EmployeeTimesheetActionRequestBody {
  from_date: string;
  to_date: string;
  users: {
    status: string;
    projects: {
      project_id: number;
      user_ids: string[];
    }[];
  }[];
  action: 'Approved' | 'Rejected';
  reject_reason?: string;
}

export interface EmployeeTimesheetActionPayload {
  from_date: Date;
  to_date: Date;
  users: {userId: string; projectId: number; status: TimesheetStatus}[];
  action: 'Approved' | 'Rejected';
  reject_reason?: string;
}

export interface TimesheetActionRequestBody {
  from_date: string;
  to_date: string;
  timesheet_ids: string[];
  action: 'Approved' | 'Rejected';
  reject_reason?: string;
}
