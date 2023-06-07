export type GetTeamMembersLeavesResponse = {
  message?: string;
  data: {
    name: string;
    from: string;
    to: string;
    days: number;
  }[];
};
