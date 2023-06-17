import React, {useCallback, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import Button from '../../components/button';
import {useLogin} from './login.hooks';

import {googleSignIn} from '../../services/auth/google.auth';

import {JoshLogo} from '../../constant/icons';

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
    paddingVertical: 90,
  },
  logoContainer: {
    paddingVertical: 90,
    alignItems: 'center',
  },
});

export default LoginScreen;
