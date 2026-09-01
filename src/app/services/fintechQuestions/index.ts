import {apiCall} from '../api';

import {
  FINTECH_SUBMIT_ANSWER_ROUTE,
  FINTECH_TODAY_QUESTION_ROUTE,
} from '../../constant/apiRoutes';
import {
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  TodayQuestionResponse,
} from './types';

export const getTodayQuestion = async () => {
  const response = await apiCall<undefined, TodayQuestionResponse>({
    method: 'GET',
    url: FINTECH_TODAY_QUESTION_ROUTE,
  });

  return response;
};

export const submitAnswer = async (payload: SubmitAnswerRequest) => {
  const response = await apiCall<SubmitAnswerRequest, SubmitAnswerResponse>({
    method: 'POST',
    url: FINTECH_SUBMIT_ANSWER_ROUTE,
    data: payload,
  });

  return response;
};
