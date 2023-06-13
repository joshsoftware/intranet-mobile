export interface IPersonalDetails {
  panNumber: string | null;
  personalEmail: string | null;
  passportNumber: string | null;
  qualification: string | null;
  dateOfJoining: string | null;
  workExperience: number;
  previousCompany: string | null;
  tshirtSize: string | null;
  end_of_probation: string | null;
}

export interface IEmergencyContactDetails {
  name: string | null;
  relation: string | null;
  phoneNumber: string | null;
}

export interface IAddress {
  typeOfAddress: string;
  address: string | null;
  city: string | null;
  pinCode: string | null;
  state: string | null;
  mobileNumber: string | null;
}

export interface IPersonalDetailsData {
  personalDetail: IPersonalDetails;
  emergencyContactDetails: IEmergencyContactDetails[];
  address: IAddress[];
}
