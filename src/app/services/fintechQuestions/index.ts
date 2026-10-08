import {apiCall} from '../api';

import {
  FINTECH_SEMESTER_SUMMARY_ROUTE,
  FINTECH_SUBMIT_ANSWER_ROUTE,
  FINTECH_TODAY_QUESTION_ROUTE,
  FINTECH_UPDATE_LOCATION_ROUTE,
  USER_ATTENDANCE_SUMMARY_ROUTE,
} from '../../constant/apiRoutes';
import {
  AttendanceSummaryResponse,
  SemesterSummaryResponse,
  SubmitAnswerRequest,
  SubmitAnswerResponse,
  TodayQuestionResponse,
  UpdateLocationRequest,
  UpdateLocationResponse,
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

export const updateLocation = async (payload: UpdateLocationRequest) => {
  const response = await apiCall<UpdateLocationRequest, UpdateLocationResponse>(
    {
      method: 'POST',
      url: FINTECH_UPDATE_LOCATION_ROUTE,
      data: payload,
    },
  );

  return response;
};

export const getFintechSemesterSummary = async (params?: {
  start_year?: number;
  start_month?: number;
}) => {
  const response = await apiCall<undefined, SemesterSummaryResponse>({
    method: 'GET',
    url: FINTECH_SEMESTER_SUMMARY_ROUTE,
    params,
  });

  return response;
};

export const getUserAttendanceSummary = async (params?: {
  month?: number;
  year?: number;
}) => {
  const response = await apiCall<undefined, AttendanceSummaryResponse>({
    method: 'GET',
    url: USER_ATTENDANCE_SUMMARY_ROUTE,
    params,
  });

  return response;
};
