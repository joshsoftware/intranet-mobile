import {useCallback, useContext, useState} from 'react';
import {useMutation} from 'react-query';
import {AxiosError} from 'axios';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import UserContext, {UserData} from '../../context/user.context';
import AsyncStore from '../../services/asyncStorage';
import {
  LoginResponseBody,
  AuthType,
  sendLoginRequest,
  LoginErrorResponseBody,
  IntranetErrorCode,
  sendGenerateOTPRequest,
} from '../../services/api/login';
import {googleSignIn, googleSignOut} from '../../services/auth/google.auth';
import {appleSignIn} from '../../services/auth/apple.auth';
import {logEvent} from '../../services/firebase/analytics';
import toast from '../../utils/toast';

import {RootStackParamList} from '../../navigation/types';
import {LOGIN_INSTRUCTION_SCREEN} from '../../constant/screenNames';

export const useLogin = () => {
  const [, setUserContextData] = useContext(UserContext);
  const [authType, setAuthType] = useState<AuthType>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {mutate, isLoading} = useMutation(sendLoginRequest, {
    onSuccess: async response => {
      const responseData = response.data.data;
      await logEvent('INTRANET_SIGNIN_SUCCESS', {
        role: response?.data?.data?.role,
        userId: response?.data?.data?.user_id,
      });

      const authToken = responseData.jwtToken;
      const userData: UserData = {
        role: responseData.role,
        userId: responseData.user_id,
      };

      await AsyncStore.setItem(AsyncStore.AUTH_TOKEN_KEY, authToken);
      await AsyncStore.setItem(AsyncStore.USER_DATA, JSON.stringify(userData));

      setUserContextData({authToken, userData});
    },
    onError: async (error: AxiosError<LoginResponseBody>) => {
      await logEvent('INTRANET_SIGNIN_FAILED', {
        message: error?.response?.data?.message || '',
      });

      await googleSignOut();

      if (error.response) {
        if (error.response.status >= 500) {
          toast('Server Error: Please try again later.', 'error');
        } else if (error.response.status === 404) {
          let responseData = error.response
            .data as unknown as LoginErrorResponseBody;

          const code =
            responseData?.data?.code || IntranetErrorCode.MISSING_EMAIL;
          const type = responseData?.data?.type || AuthType.GOOGLE;
          const email = responseData?.data?.email || '';

          navigation.navigate(LOGIN_INSTRUCTION_SCREEN, {
            code: code,
            email: email,
            type: type,
          });
        } else {
          const responseData = error.response.data;
          toast(responseData.message, 'error');
        }
      } else {
        toast('Network Error: Please try again.', 'error');
      }
    },
  });

  const otpSignInHandler = useCallback(
    async (email: string, otp: string) => {
      setAuthType(AuthType.OTP);
      mutate({
        type: AuthType.OTP,
        email: email,
        otp: otp,
      });
    },
    [mutate],
  );

  const googleSignInHandler = useCallback(async () => {
    await logEvent('GOOGLE_SIGNIN_BUTTON_CLICK');
    const response = await googleSignIn();
    if (response) {
      mutate(response);
      setAuthType(AuthType.GOOGLE);
    }
  }, [mutate]);

  const appleSignInHandler = useCallback(async () => {
    await logEvent('APPLE_SIGNIN_BUTTON_CLICK');
    const response = await appleSignIn();
    if (response) {
      mutate(response);
      setAuthType(AuthType.APPLE);
    }
  }, [mutate]);

  return {
    isLoading,
    otpSignInHandler,
    googleSignInHandler,
    appleSignInHandler,
    isOTPAuth: authType === 'otp',
    isGoogleAuth: authType === 'google',
    isAppleAuth: authType === 'apple',
  };
};

export const useGenerateOTP = (successCallback: () => void) => {
  const {mutate, isLoading} = useMutation(sendGenerateOTPRequest, {
    onSuccess: response => {
      if (response === undefined) {
        toast('Network Error: Please try again.', 'error');
      } else {
        successCallback();
      }
    },
    onError: async (error: AxiosError<LoginResponseBody>) => {
      if (error.response) {
        if (error.response.status >= 500) {
          toast('Server Error: Please try again later.', 'error');
        } else {
          const responseData = error.response.data;
          toast(responseData.message, 'error');
        }
      } else {
        toast('Network Error: Please try again.', 'error');
      }
    },
  });

  const generateOTP = (email: string) => {
    mutate({
      type: AuthType.OTP,
      email: email,
    });
  };

  return {
    generateOTP,
    isLoading,
  };
};
