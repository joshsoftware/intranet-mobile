import React, {FC, PropsWithChildren, useContext, useMemo} from 'react';
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';

import AsyncStore from '../asyncStorage';
import UserContext from '../../context/user.context';
import {googleSignOut} from '../auth/google.auth';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const Interceptor: FC<PropsWithChildren> = ({children}) => {
  const [, setUserContext] = useContext(UserContext);

  useMemo(() => {
    axiosInstance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        const isTokenInvalid =
          error.response.status === 401 &&
          error.response.data.message.toLowerCase().includes('invalid token');

        if (isTokenInvalid) {
          await AsyncStore.removeItem(AsyncStore.AUTH_TOKEN_KEY);
          await AsyncStore.removeItem(AsyncStore.USER_DATA);
          await googleSignOut();
          setUserContext(null);
        }

        return Promise.reject(error);
      },
    );
  }, [setUserContext]);

  return <>{children}</>;
};

export const apiCall = async <T, D>(config: AxiosRequestConfig<T>) => {
  const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);

  const authorizationHeader = authToken;

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
