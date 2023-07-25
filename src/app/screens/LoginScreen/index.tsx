import React, {useEffect, useCallback} from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';

import Button from '../../components/button';
import {useLogin} from './login.hooks';

import {googleSignIn} from '../../services/auth/google.auth';

import {JoshLogo} from '../../constant/icons';
import boxBackgroundImage from '../../../assets/images/boxBackground.png';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const LoginScreen = () => {
  const {mutate, isLoading} = useLogin();
  const insets = useSafeAreaInsets();

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
      <View
        style={[
          styles.container,
          {paddingTop: insets.top, paddingBottom: insets.bottom},
        ]}>
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
      </View>
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
});

export default LoginScreen;
