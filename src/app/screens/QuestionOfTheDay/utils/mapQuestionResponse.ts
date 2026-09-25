import {
  QuestionOption,
  TodayQuestionData,
} from '../../../services/fintechQuestions/types';

export type UiQuizOption = {
  id: QuestionOption;
  text: string;
};

export const mapApiOptions = (data: TodayQuestionData): UiQuizOption[] => {
  const pairs: [QuestionOption, string | null][] = [
    ['A', data.option_a],
    ['B', data.option_b],
    ['C', data.option_c],
    ['D', data.option_d],
  ];

  return pairs
    .filter(([, text]) => text != null && text !== '')
    .map(([id, text]) => ({id, text: text!}));
};
