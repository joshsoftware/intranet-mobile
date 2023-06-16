export type GetHomeTimesheetDataResponse = {
  message: string;
  data: {
    filled: string[];
    not_filled: string[];
    incomplete_filled: string[];
    leaves: string[];
    holidays: string[];
  };
};

export type GetTeamMembersLeavesResponse = {
  message?: string;
  data: {
    name: string;
    from: string;
    to: string;
    leave_type: string;
    days: number;
  }[];
};

export type GetTeamMembersBirthdaysResponse = {
  message?: string;
  data: {
    name: string;
    date: string;
  }[];
};
