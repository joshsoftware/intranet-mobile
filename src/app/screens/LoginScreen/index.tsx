import React, {useEffect, useCallback} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';

import Button from '../../components/button';
import {useLogin} from './login.hooks';

import {googleSignIn} from '../../services/auth/google.auth';

import {JoshLogo} from '../../constant/icons';
import boxBackgroundImage from '../../../assets/images/boxBackground.png';

const LoginScreen = () => {
  const {mutate, isLoading} = useLogin();

  const googleSignInHandler = useCallback(async () => {
    const response = await googleSignIn();
    if (response) {
      mutate(response);
    }
  }, [mutate]);

  useEffect(() => {
    googleSignInHandler();
  }, [googleSignInHandler]);

  return (
    <ImageBackground source={boxBackgroundImage} style={styles.imageContainer}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <JoshLogo />
        </View>
        <View>
          <Button
            type="primary"
            title="Login With Google"
            disabled={isLoading}
            onPress={googleSignInHandler}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingVertical: 90,
  },
  imageContainer: {
    flex: 1,
  },
  logoContainer: {
    paddingVertical: 90,
    alignItems: 'center',
  },
});

export default LoginScreen;
