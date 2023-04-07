export type AssetType = {
  name: string;
  startDate: string;
  endDate?: string;
  isActive?: boolean;
};

export type profileDetailsType = {
  firstName: string;
  lastName: string;
  Gender: string;
  mobileNumber: string;
  bloodGroup: string;
  dateOfBirth: string;
};

export type socialDetailsType = {
  name: string;
  uri: string;
}[];

export type personalDetailsType = {
  panNumber: string;
  personalEmail: string;
  passportNumber: string;
  qualification: string;
  dateOfJoining: string;
  workExprience: number;
  previousCompany: string;
  bonuslyAuthToken: string;
  tshirtSize: string;
};

export type emergencyContactDetailsType = {
  name: string;
  relation: string;
  phoneNumber: string;
};

export type addressType = {
  address: string;
  city: string;
  pinCode: string;
  state: string;
  mobileNumber: string;
};

export type employeeDetailsType = {
  employeeId: string;
  emailId: string;
  employeeLocation: string;
};
export type designationDetailsType = {
  Designation: string;
  designationTrack: string;
};

export type assessmentDetailsType = {
  assessmentPlatform: string;
  assessmentMonth: number;
};

export type otherDetailsType = {
  grade: string;
  company: string;
  businessUnit: string;
  subBusinessUnit: string;
  function: string;
  dateOfReleaving: string;
  notificationEmail: string;
  defaultLeaveApprover: string;
  source: string;
  project: string;
};

export type projectType = {
  projectName: string;
  type: string;
  startDate: string;
  endDate: string;
  isTimesheetRequired: boolean;
  billable: boolean;
  allocation: number;
};

export type skillsType = {
  primary: string;
  secondary: string;
  others: string[];
};
export type deploymentDetailsType = {
  availableForm: string;
  cvLink: string;
  deploymentOwnerEmail: string;
  ownedByEmails: string;
  OETA: string;
  NETA: string;
  availableHours: number;
  interviewRejected: string;
  deploymentNote: string;
  remark: string;
};

export type detailsType =
  | profileDetailsType
  | personalDetailsType
  | emergencyContactDetailsType
  | addressType
  | employeeDetailsType
  | designationDetailsType
  | assessmentDetailsType
  | otherDetailsType
  | projectType
  | projectType[]
  | deploymentDetailsType
  | {primary: string; secondary: string};
