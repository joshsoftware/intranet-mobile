import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

import {API_BASE_URL} from '@env';
import AsyncStore from '../asyncStorage';

console.log(API_BASE_URL);

let axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const apiCall = async <T, D>(config: AxiosRequestConfig<T>) => {
  const authToken = await AsyncStore.getAuthToken();

  const authorizationHeader = `Bearer ${authToken}`;

  if (config.headers) {
    config.headers.Authorization = authorizationHeader;
  } else {
    config.headers = {
      Authorization: authorizationHeader,
    };
  }

  const response = await axiosInstance.request<D>(config);
  return response;
};
