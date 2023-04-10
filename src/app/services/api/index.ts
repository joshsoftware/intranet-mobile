import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {API_BASE_URL} from '@env';
import AsyncStore from '../asyncStorage';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiCall = async <T, D>(config: AxiosRequestConfig<T>) => {
  const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);

  const authorizationHeader = authToken;

  if (config.headers) {
    config.headers.Authorization = authorizationHeader;
  } else {
    config.headers = {
      auth_key: authorizationHeader,
    };
  }

  const response = await axiosInstance.request<D>(config);
  return response;
};
