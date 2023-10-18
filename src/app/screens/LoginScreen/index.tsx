import React, {useState} from 'react';
import {ImageBackground, Platform, StyleSheet, View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Button from '../../components/button';
import AppleLoginInfoModal from './components/AppleLoginInfoModal';
import Input from '../../components/input';
import {useGenerateOTP, useLogin} from './login.hooks';

import {OTP_AUTHENTICATION_SCREEN} from '../../constant/screenNames';
import colors from '../../constant/colors';
import {RootStackParamList} from '../../navigation/types';

import {JoshLogo} from '../../constant/icons';
import boxBackgroundImage from '../../../assets/images/boxBackground.png';

const LoginScreen = () => {
  const {
    isLoading,
    isGoogleAuth,
    isAppleAuth,
    googleSignInHandler,
    appleSignInHandler,
  } = useLogin();
  const insets = useSafeAreaInsets();
  const [showAppleLoginInfoModal, setShowAppleLoginInfoModal] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleAppleLoginContinue = () => {
    setShowAppleLoginInfoModal(false);
    appleSignInHandler();
  };

  const handleEmailChange = (txt: string) => {
    setEmail(txt);
    setEmailError('');
  };

  const handleOTPSignInClick = () => {
    if (email.endsWith('@joshsoftware.com') === false) {
      setEmailError('Enter a valid email with joshsoftware domain!');
      return;
    }

    generateOTP(email);
  };

  const otpGenerationSuccessHandler = () => {
    navigation.navigate(OTP_AUTHENTICATION_SCREEN, {email});
  };

  const {isLoading: isOTPLoading, generateOTP} = useGenerateOTP(
    otpGenerationSuccessHandler,
  );

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <KeyboardAwareScrollView
        style={[
          styles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}
        keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <JoshLogo />
        </View>
        <View>
          <View style={styles.emailContainer}>
            <Text style={styles.label}>Email</Text>
            <Input
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              inputMode="email"
              value={email}
              onChangeText={handleEmailChange}
              placeholder="user@joshsoftware.com"
              error={emailError}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              type="primary"
              title="Login With OTP"
              disabled={isLoading || isOTPLoading}
              onPress={handleOTPSignInClick}
              isLoading={isOTPLoading}
            />

            <View style={styles.OrContainer}>
              <View style={styles.OrLine} />
              <Text>OR</Text>
              <View style={styles.OrLine} />
            </View>

            <Button
              type="primary"
              title="Login With Google"
              disabled={isLoading || isOTPLoading}
              onPress={googleSignInHandler}
              isLoading={isLoading && isGoogleAuth}
            />
            {Platform.OS === 'ios' && (
              <Button
                type="primary"
                title="Login With Apple"
                disabled={isLoading || isOTPLoading}
                onPress={() => setShowAppleLoginInfoModal(true)}
                isLoading={isLoading && isAppleAuth}
              />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <AppleLoginInfoModal
        isVisible={showAppleLoginInfoModal}
        closeModal={() => setShowAppleLoginInfoModal(false)}
        continueAppleLogin={handleAppleLoginContinue}
      />
    </ImageBackground>
  );
};

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
    gap: 10,
  },
  OrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 16,
  },
  OrLine: {
    flex: 1,
    borderBottomColor: colors.SECONDARY,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontWeight: 'bold',
  },
  emailContainer: {
    padding: 10,
  },
});

export default LoginScreen;
