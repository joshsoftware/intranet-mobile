import React, {useState} from 'react';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Button from '../../components/button';
import AppleLoginInfoModal from './components/AppleLoginInfoModal';
import {useLogin} from './login.hooks';

import {JoshLogo} from '../../constant/icons';
import boxBackgroundImage from '../../../assets/images/boxBackground.png';
import OTPSignInModal from './components/OTPSignInModal';

const LoginScreen = () => {
  const {
    isLoading,
    isOTPAuth,
    isGoogleAuth,
    isAppleAuth,
    otpSignInHandler,
    googleSignInHandler,
    appleSignInHandler,
  } = useLogin();
  const insets = useSafeAreaInsets();
  const [showAppleLoginInfoModal, setShowAppleLoginInfoModal] = useState(false);
  const [showOTPSignInModal, setShowOTPSignInModal] = useState(false);

  const handleAppleLoginContinue = () => {
    setShowAppleLoginInfoModal(false);
    appleSignInHandler();
  };

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <View
        style={[
          styles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
        <View style={styles.logoContainer}>
          <JoshLogo />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            type="primary"
            title="Login With OTP"
            disabled={isLoading}
            onPress={() => setShowOTPSignInModal(true)}
            isLoading={isLoading && isOTPAuth}
          />
          <Button
            type="primary"
            title="Login With Google"
            disabled={isLoading}
            onPress={googleSignInHandler}
            isLoading={isLoading && isGoogleAuth}
          />
          {Platform.OS === 'ios' && (
            <Button
              type="primary"
              title="Login With Apple"
              disabled={isLoading}
              onPress={() => setShowAppleLoginInfoModal(true)}
              isLoading={isLoading && isAppleAuth}
            />
          )}
        </View>
      </View>

      <AppleLoginInfoModal
        isVisible={showAppleLoginInfoModal}
        closeModal={() => setShowAppleLoginInfoModal(false)}
        continueAppleLogin={handleAppleLoginContinue}
      />

      <OTPSignInModal
        isVisible={showOTPSignInModal}
        closeModal={() => setShowOTPSignInModal(false)}
        otpSignInHandler={otpSignInHandler}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
    paddingVertical: 90,
  },
  imageContainer: {
    flex: 1,
  },
  logoContainer: {
    paddingVertical: 90,
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 10,
  },
});

export default LoginScreen;
