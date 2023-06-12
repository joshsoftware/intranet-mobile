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
