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
  latitude?: number;
  longitude?: number;
};

export type SubmitAnswerData = {
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
