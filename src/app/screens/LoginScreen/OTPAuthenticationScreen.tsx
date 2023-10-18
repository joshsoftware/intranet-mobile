import React, {useEffect, useRef, useState} from 'react';
import {ImageBackground, Platform, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Button from '../../components/button';
import Input from '../../components/input';
import {useGenerateOTP, useLogin} from './login.hooks';

import colors from '../../constant/colors';
import {
  OTPAuthenticationScreenNavigationProp,
  RootStackParamList,
} from '../../navigation/types';

import {JoshLogo} from '../../constant/icons';
import boxBackgroundImage from '../../../assets/images/boxBackground.png';

function OTPAuthenticationScreen({
  route,
}: OTPAuthenticationScreenNavigationProp) {
  const {email} = route.params;

  const {isLoading, isOTPAuth, otpSignInHandler} = useLogin();
  const {isLoading: isOTPLoading, generateOTP} = useGenerateOTP(() => {});
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [otp, setOTP] = useState('');
  const [otpError, setOTPError] = useState('');

  const waitTimeRef = useRef(30);
  const [timerValue, setTimerValue] = useState(0);

  const handleLoginPress = () => {
    if (otp.length !== 6) {
      setOTPError('Enter valid OTP of 6 digits!');
      return;
    }

    otpSignInHandler(email, otp);
  };

  const handleBackToLogin = () => {
    navigation.pop();
  };

  const handleOTPChange = (txt: string) => {
    setOTP(txt);
    setOTPError('');
  };

  const handleResendOTP = () => {
    setTimerValue(waitTimeRef.current);

    if (waitTimeRef.current < 240) {
      waitTimeRef.current *= 2;
    }

    generateOTP(email);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerValue(value => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View
        style={[
          styles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <JoshLogo />
          </View>
          <View>
            <View style={styles.otpContainer}>
              <Text style={styles.label}>OTP</Text>
              <Input
                autoCorrect={false}
                autoComplete="off"
                autoCapitalize="none"
                inputMode="numeric"
                value={otp}
                maxLength={6}
                onChangeText={handleOTPChange}
                keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                placeholder="OTP"
                error={otpError}
              />
            </View>
            <Text style={styles.resendOTPContainer}>
              <Text
                style={[
                  styles.resendOTP,
                  timerValue > 0 ? styles.disabledResendOTP : {},
                ]}
                onPress={handleResendOTP}
                disabled={timerValue > 0 || isLoading || isOTPLoading}>
                Resend OTP
              </Text>
              {timerValue > 0 && <Text> in </Text>}
              {timerValue > 0 && (
                <Text>
                  {Math.floor(timerValue / 60).toLocaleString('en-IN', {
                    minimumIntegerDigits: 2,
                  })}
                  :
                  {(timerValue % 60).toLocaleString('en-IN', {
                    minimumIntegerDigits: 2,
                  })}
                </Text>
              )}
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                type="primary"
                title="Verify OTP"
                onPress={handleLoginPress}
                isLoading={isLoading}
                disabled={isLoading && isOTPAuth}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.backToLoginContainer}>
          <Button
            type="secondary"
            title="Back to Login"
            onPress={handleBackToLogin}
            disabled={isLoading && isOTPAuth}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 90,
  },
  imageContainer: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 150,
    marginBottom: 100,
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  otpContainer: {
    padding: 10,
  },
  backToLoginContainer: {
    marginBottom: 16,
  },
  resendOTPContainer: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 25,
  },
  resendOTP: {
    fontWeight: 'bold',
    color: colors.PRIMARY,
  },
  disabledResendOTP: {
    color: colors.GREY_BORDER_COLOR,
  },
});

export default OTPAuthenticationScreen;
