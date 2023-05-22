export interface IEmployeeDetails {
  employeeId: string | null;
  emailId: string | null;
  employeeLocation: string | null;
}

export interface IDesignationDetails {
  designation: string | null;
  designationTrack: string | null;
}

export interface IAssessmentDetails {
  assessmentPlatform: string | null;
  assessmentMonths: string[];
}

export interface IOtherDetails {
  grade: string | null;
  company: string | null;
  businessUnit: string | null;
  subBusinessUnit: string | null;
  function: string | null;
  dateOfRelieving: string | null;
  notificationEmails: string[] | null;
  defaultLeaveApprover: string | null;
  source: string | null;
  project: string | null;
  description: string;
}

export interface IProject {
  projectName: string | null;
  type: string | null;
  startDate: string | null;
  endDate: string | null;
  isTimesheetRequired: boolean;
  billable: boolean;
  allocation: number;
}

export interface IEmployeeDetailData {
  employeeDetail: IEmployeeDetails;
  designationDetails: IDesignationDetails;
  assessmentDetails: IAssessmentDetails;
  otherDetails: IOtherDetails;
  currentProjects: IProject[];
  previousProjects: IProject[];
}
