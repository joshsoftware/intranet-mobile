import React, {useState} from 'react';
import {ImageBackground, Platform, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Button from '../../components/button';
import AppleLoginInfoModal from './components/AppleLoginInfoModal';
import {useLogin} from './login.hooks';

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
  const [showModal, setShowModal] = useState(false);

  const handleAppleLoginContinue = () => {
    setShowModal(false);
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
            title="Login With Google"
            disabled={isLoading}
            onPress={googleSignInHandler}
            isLoading={isLoading && isGoogleAuth}
          />
          <Button
            type="primary"
            title="Login With Apple"
            disabled={isLoading || Platform.OS !== 'ios'}
            onPress={() => setShowModal(true)}
            isLoading={isLoading && isAppleAuth}
          />
        </View>
      </View>

      <AppleLoginInfoModal
        isVisible={showModal}
        closeModal={() => setShowModal(false)}
        continueAppleLogin={handleAppleLoginContinue}
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
