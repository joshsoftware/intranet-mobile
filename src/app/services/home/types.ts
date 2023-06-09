export type GetHomeTimesheetDataResponse = {
  data: {
    filled: string[];
    not_filled: string[];
    incomplete_filled: string[];
    leaves: string[];
    holidays: string[];
  };
};
