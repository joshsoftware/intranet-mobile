import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';

import LoginForm from './LoginForm';
import {useLogin} from './login.hooks';

import colors from '../../constant/colors';
import {JoshLogo} from '../../constant/icons';
import {SecondaryButton} from '../../components/button';

const LoginScreen = () => {
  const {googleSignInHandler, emailPasswordSignInHandler, isLoading} =
    useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <JoshLogo />
        </View>

        <Text style={styles.loginText}>LOGIN</Text>

        <LoginForm signIn={emailPasswordSignInHandler} isLoading={isLoading} />

        <Text style={styles.orText}>Or</Text>

        <SecondaryButton
          title="Login With Google"
          isLoading={isLoading}
          onPress={googleSignInHandler}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    padding: 16,
  },
  ScrollView: {
    flex: 1,
  },
  logoContainer: {
    paddingVertical: 90,
    alignItems: 'center',
  },

  loginText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.TERTIARY_TEXT,
    paddingVertical: 20,
  },

  googleSigninButton: {
    backgroundColor: colors.WHITE,
    padding: 12,
    borderRadius: 22,
    alignItems: 'center',
    borderColor: colors.PRIMARY,
    borderWidth: 2,
  },
  googleSigninButtonText: {
    color: colors.PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
  orText: {
    fontSize: 12,
    color: colors.QUATERNARY_TEXT,
    fontWeight: 'bold',
    marginVertical: 14,
    alignSelf: 'center',
  },
});

export default LoginScreen;
