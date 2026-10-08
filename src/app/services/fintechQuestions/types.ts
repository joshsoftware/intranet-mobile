export type TodayQuestionStatus =
  | 'assigned'
  | 'answered'
  | 'on_leave'
  | 'no_question';

export type QuestionOption = 'A' | 'B' | 'C' | 'D';

export type TodayQuestionData = {
  question_id: number;
  coe: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string | null;
  option_d: string | null;
};

export type TodayQuestionResponse = {
  status: TodayQuestionStatus;
  message?: string;
  data?: TodayQuestionData;
};

export type SubmitAnswerRequest = {
  question_id: number;
  selected_option: QuestionOption;
};

export type SubmitAnswerData = {
  response_id?: number | string;
  question_id: number;
  selected_option: string;
  correct_option: QuestionOption;
  is_correct: boolean;
  explanation: string;
  submitted_at: string;
};

export type SubmitAnswerResponse = {
  status: 'success' | 'error';
  message: string;
  data?: SubmitAnswerData;
};

export type UpdateLocationRequest = {
  response_id: number;
  latitude: number;
  longitude: number;
};

export type UpdateLocationResponse = {
  status: 'success' | 'error';
  message: string;
};

export type SemesterInfo = {
  label: string;
  start_date: string;
  end_date: string;
};

export type OverallSummary = {
  total_assigned: number;
  total_answered: number;
  correct_count: number;
  incorrect_count: number;
  attempt_rate: number;
  accuracy_rate: number;
};

export type MonthlySummaryApiItem = {
  year: number;
  month: number;
  label: string;
  short_label: string;
  assigned_count: number;
  answered_count: number;
  correct_count: number;
  accuracy_rate: number;
  is_future: boolean;
  is_current: boolean;
};

export type SemesterSummaryData = {
  semester: SemesterInfo;
  overall_summary: OverallSummary;
  monthly_summary: MonthlySummaryApiItem[];
};

export type SemesterSummaryResponse = {
  status: 'success' | 'error';
  data: SemesterSummaryData;
};

export type AttendanceSummaryCounts = {
  present_days?: number;
  absent_days?: number;
  pending_leaves?: number;
  approved_leaves?: number;
  holidays?: number;
  present_count?: number;
  absent_count?: number;
  pending_leaves_count?: number;
  approved_leaves_count?: number;
  holidays_count?: number;
};

export type AttendanceSummaryData = {
  year?: number;
  month?: number;
  label?: string;
  present_days?: number;
  absent_days?: number;
  pending_leaves?: number;
  approved_leaves?: number;
  holidays?: number;
  present_count?: number;
  absent_count?: number;
  pending_leaves_count?: number;
  approved_leaves_count?: number;
  holidays_count?: number;
  summary?: AttendanceSummaryCounts;
};

export type AttendanceSummaryResponse = {
  status: 'success' | 'error';
  data: AttendanceSummaryData;
};
