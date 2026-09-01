import {useMemo} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {
  getTodayQuestion,
  submitAnswer,
} from '../../services/fintechQuestions';
import {
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  TodayQuestionData,
  TodayQuestionResponse,
} from '../../services/fintechQuestions/types';
import toast from '../../utils/toast';

export type DailyQuizGate = 'loading' | 'required' | 'skipped';

export const useDailyQuizGate = (enabled: boolean) => {
  const {data, isLoading, isError, refetch} = useQuery<
    AxiosResponse<TodayQuestionResponse>
  >({
    queryKey: ['fintech_today_question'],
    queryFn: getTodayQuestion,
    enabled,
    staleTime: 0,
    retry: 2,
  });

  const response = data?.data;
  const status = response?.status;

  const gate: DailyQuizGate = useMemo(() => {
    if (!enabled) {
      return 'skipped';
    }
    if (isLoading) {
      return 'loading';
    }
    if (isError || !response) {
      return 'skipped';
    }
    if (status === 'assigned' && response.data) {
      return 'required';
    }
    return 'skipped';
  }, [enabled, isError, isLoading, response, status]);

  return {
    gate,
    question: response?.data as TodayQuestionData | undefined,
    refetch,
  };
};

export const useSubmitAnswer = (onAlreadySubmitted?: () => void) => {
  return useMutation<
    AxiosResponse<SubmitAnswerResponse>,
    AxiosError<SubmitAnswerResponse>,
    SubmitAnswerRequest
  >({
    mutationFn: submitAnswer,
    onError: error => {
      const message =
        error.response?.data?.message ?? 'Failed to submit answer.';
      toast(message, 'error');

      if (error.response?.status === 422) {
        onAlreadySubmitted?.();
      }
    },
  });
};
