export interface IDeploymentDetails {
  availableFrom: string | null;
  cvLink: string | null;
  deploymentOwnerEmails: string[] | null;
  ownedByEmails: string[] | null;
  OETA: string | null;
  NETA: string | null;
  availableHours: number | null;
  interviewRejected: string | null;
  deploymentNote: string | null;
  remark: string | null;
}
