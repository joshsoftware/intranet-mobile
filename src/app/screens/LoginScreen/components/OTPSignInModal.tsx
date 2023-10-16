import React, {useEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import BottomModal from '../../../components/BottomModal';
import Button from '../../../components/button';
import Input from '../../../components/input';
import colors from '../../../constant/colors';
import {Info} from '../../../constant/icons';
import {useGenerateOTP} from '../login.hooks';
import {errorStyles} from '../styles';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  otpSignInHandler: (email: string, otp: string) => void;
}

function OTPSignInModal(props: Props) {
  const {isVisible, closeModal, otpSignInHandler} = props;

  const [emailView, setEmailView] = useState(true);

  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpError, setOTPError] = useState('');

  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');

  const waitTimeRef = useRef(30);
  const [timerValue, setTimerValue] = useState(0);

  const handleCloseModal = () => {
    setError('');
    setEmailError('');
    setOTPError('');
    setEmail('');
    setOTP('');
    closeModal();
  };

  const handleLogin = async () => {
    let validationError = false;
    if (email.endsWith('@joshsoftware.com') === false) {
      setEmailError('Enter a valid email of joshsoftware domain!');
      validationError = true;
    }

    if (otp.length === 0) {
      setOTPError('OTP is required!');
      validationError = true;
    }

    if (validationError) {
      return;
    }

    closeModal();
    otpSignInHandler(email, otp);
  };

  const otpSuccessCallback = () => {
    setError('');
    setEmailView(false);
  };

  const otpErrorCallback = (errorMessage: string) => {
    setError(errorMessage);
  };

  const {generateOTP, isLoading} = useGenerateOTP(
    otpSuccessCallback,
    otpErrorCallback,
  );

  const handleSendOTP = (isFirst: boolean) => {
    if (email.endsWith('@joshsoftware.com') === false) {
      setEmailError('Enter a valid email of joshsoftware domain!');
      return;
    }

    console.log(isFirst);

    if (!isFirst) {
      setTimerValue(waitTimeRef.current);
      if (waitTimeRef.current < 120) {
        waitTimeRef.current *= 2;
      }
    } else {
      waitTimeRef.current = 30;
    }

    generateOTP(email);
  };

  const handleEmailChange = (txt: string) => {
    setEmail(txt);
    setEmailError('');
  };

  const handleOTPChange = (txt: string) => {
    setOTP(txt);
    setOTPError('');
  };

  const handleBackClick = () => {
    setEmailView(true);
    setError('');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimerValue(value => (value === 0 ? 0 : value - 1));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <BottomModal
      isVisible={isVisible}
      closeModal={handleCloseModal}
      closeOnBackdropPress={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in with OTP</Text>

        {error && (
          <View style={styles.errorContainer}>
            <View>
              <Info fill={errorStyles.icon.color} />
            </View>
            <View style={styles.errorMessageContainer}>
              <Text style={errorStyles.text}>{error}</Text>
            </View>
          </View>
        )}
        {emailView ? (
          <EmailView
            email={email}
            handleEmailChange={handleEmailChange}
            emailError={emailError}
            handleCloseModal={handleCloseModal}
            handleSendOTP={() => handleSendOTP(true)}
            isLoading={isLoading}
          />
        ) : (
          <OTPView
            otp={otp}
            handleOTPChange={handleOTPChange}
            otpError={otpError}
            timerValue={timerValue}
            handleSendOTP={() => handleSendOTP(false)}
            handleBackClick={handleBackClick}
            handleLogin={handleLogin}
          />
        )}
      </View>
    </BottomModal>
  );
}

interface EmailViewProps {
  email: string;
  handleEmailChange: (txt: string) => void;
  emailError: string;
  handleCloseModal: () => void;
  handleSendOTP: () => void;
  isLoading: boolean;
}

function EmailView(props: EmailViewProps) {
  const {
    email,
    emailError,
    handleEmailChange,
    handleCloseModal,
    handleSendOTP,
    isLoading,
  } = props;

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <Input
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
          autoComplete="off"
          inputMode="email"
          onChangeText={handleEmailChange}
          placeholder="user@joshsoftware.com"
          error={emailError}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" type="secondary" onPress={handleCloseModal} />
        <Button
          title="Send OTP"
          type="primary"
          onPress={handleSendOTP}
          disabled={isLoading}
          isLoading={isLoading}
        />
      </View>
    </>
  );
}

interface OTPViewProps {
  otp: string;
  handleOTPChange: (txt: string) => void;
  otpError: string;
  timerValue: number;
  handleSendOTP: () => void;
  handleBackClick: () => void;
  handleLogin: () => void;
}

function OTPView(props: OTPViewProps) {
  const {
    otp,
    handleOTPChange,
    otpError,
    timerValue,
    handleSendOTP,
    handleBackClick,
    handleLogin,
  } = props;

  return (
    <>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>OTP</Text>
        <Input
          value={otp}
          inputMode="numeric"
          keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
          onChangeText={handleOTPChange}
          placeholder="OTP"
          maxLength={6}
          error={otpError}
        />
      </View>

      <Text>
        <Text
          style={[
            styles.sendOTPButton,
            timerValue !== 0 ? styles.disabledSenndOTPButton : {},
          ]}
          disabled={timerValue !== 0}
          onPress={handleSendOTP}>
          Resend OTP
        </Text>
        {timerValue !== 0 && (
          <Text>
            {' '}
            in
            {Math.floor(timerValue / 60).toLocaleString('en-IN', {
              minimumIntegerDigits: 2,
            })}
            :
            {Math.floor(timerValue % 60).toLocaleString('en-IN', {
              minimumIntegerDigits: 2,
            })}
          </Text>
        )}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Back"
          type="secondary"
          onPress={handleBackClick}
          disabled={timerValue !== 0}
        />
        <Button title="Login" type="primary" onPress={handleLogin} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {},
  inputLabel: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  sendOTPButton: {
    textAlign: 'center',
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
  disabledSenndOTPButton: {
    color: colors.GREY_BORDER_COLOR,
  },
  errorContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    borderColor: errorStyles.container.borderColor,
    borderWidth: errorStyles.container.borderWidth,
    borderRadius: 4,
    padding: 10,
  },
  errorMessageContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default OTPSignInModal;
