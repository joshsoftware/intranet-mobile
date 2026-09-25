import {useMemo} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';

import {
  getTodayQuestion,
  submitAnswer,
  updateLocation,
} from '../../services/fintechQuestions';
import {
  SubmitAnswerData,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  TodayQuestionData,
  TodayQuestionResponse,
} from '../../services/fintechQuestions/types';
import {
  getCachedCoordinates,
  getCurrentCoordinates,
} from '../../utils/location';
import toast from '../../utils/toast';

const LOCATION_RETRY_DELAYS_MS = [0, 1500, 4000];

const delay = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });

const parseResponseId = (payload?: SubmitAnswerData) => {
  const raw =
    payload?.response_id ??
    (payload as {id?: number | string} | undefined)?.id;
  const responseId = Number(raw);
  if (!Number.isFinite(responseId) || responseId <= 0) {
    return null;
  }
  return responseId;
};

const resolveCoordinates = async () => {
  const cached = getCachedCoordinates();
  if (cached) {
    return cached;
  }
  return getCurrentCoordinates();
};

const postLocationWithRetry = async (
  responseId: number,
  latitude: number,
  longitude: number,
) => {
  let lastError: unknown;
  for (let attempt = 0; attempt < LOCATION_RETRY_DELAYS_MS.length; attempt++) {
    const waitMs = LOCATION_RETRY_DELAYS_MS[attempt];
    if (waitMs > 0) {
      await delay(waitMs);
    }
    try {
      await updateLocation({
        response_id: responseId,
        latitude,
        longitude,
      });
      return;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
};

const sendLocationInBackground = async (responseId: number) => {
  try {
    const coordinates = await resolveCoordinates();
    await postLocationWithRetry(
      responseId,
      coordinates.latitude,
      coordinates.longitude,
    );
  } catch (error) {
    console.warn('[QuizLocation] Failed to send lat/long', error);
  }
};

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
    onSuccess: response => {
      const responseId = parseResponseId(response.data?.data);
      if (responseId != null) {
        sendLocationInBackground(responseId);
      } else {
        console.warn(
          '[QuizLocation] Missing response_id on submit_answer; lat/long not sent',
          response.data,
        );
      }
    },
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
