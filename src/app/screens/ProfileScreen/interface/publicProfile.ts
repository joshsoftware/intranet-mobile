export interface IProfileDetails {
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  mobileNumber: string | null;
  bloodGroup: string | null;
  dateOfBirth: string | null;
}

export interface ISocialDetails {
  github: string | null;
  linkedin: string | null;
  facebook: string | null;
  blog: string | null;
  twitter: string | null;
}

export interface IPublicProfileData {
  publicProfile: IProfileDetails;
  socialDetails: ISocialDetails;
}
