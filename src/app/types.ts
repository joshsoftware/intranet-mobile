export type AssetType = {
  name: string | null;
  startDate: string | null;
  endDate?: string | null;
  isActive?: boolean;
};

export type profileDetailsType = {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  mobileNumber: string | null;
  bloodGroup: string | null;
  dateOfBirth: string | null;
};

export type socialDetailsType = {
  github: string | null;
  linkdin: string | null;
  facebook: string | null;
  blog: string | null;
};

export type personalDetailsType = {
  panNumber: string | null;
  personalEmail: string | null;
  passportNumber: string | null;
  qualification: string | null;
  dateOfJoining: string | null;
  workExprience: number;
  previousCompany: string | null;
  tshirtSize: string | null;
};

export type emergencyContactDetailsType = {
  name: string | null;
  relation: string | null;
  phoneNumber: string | null;
};

export type addressType = {
  typeOfAddress: string | null;
  address: string | null;
  city: string | null;
  pinCode: string | null;
  state: string | null;
  mobileNumber: string | null;
};

export type employeeDetailsType = {
  employeeId: string | null;
  emailId: string | null;
  employeeLocation: string | null;
};
export type designationDetailsType = {
  designation: string | null;
  designationTrack: string | null;
};

export type assessmentDetailsType = {
  assessmentPlatform: string | null;
  assessmentMonth: string[];
};

export type otherDetailsType = {
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
};

export type projectType = {
  projectName: string | null;
  type: string | null;
  startDate: string | null;
  endDate: string | null;
  isTimesheetRequired: boolean;
  billable: boolean;
  allocation: number;
};

export type skillsType = {
  primarySkill: string | null;
  secondarySkill: string | null;
  ternarySkill: string | null;
  otherSkills: string | null;
};
export type deploymentDetailsType = {
  availableForm: string | null;
  cvLink: string | null;
  deploymentOwnerEmail: string | null;
  ownedByEmails: string | null;
  OETA: string | null;
  NETA: string | null;
  availableHours: number;
  interviewRejected: string | null;
  deploymentNote: string | null;
  remark: string | null;
};

export interface updateSkillFormDataType {
  primaryTechnicalSkill?: string;
  secondaryTechnicalSkill?: string;
  ternaryTechnicalSkill?: string;
  otherSkills?: string;
}
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
  | {primary: string | null; secondary: string | null};
