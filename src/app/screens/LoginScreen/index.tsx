import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, ScrollView} from 'react-native';

import LoginForm from './LoginForm';
import Button, {ButtonType} from '../../components/button';
import {useLogin} from './login.hooks';

import colors from '../../constant/colors';
import {JoshLogo} from '../../constant/icons';

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

        <Button
          type={ButtonType.Secondary}
          title="Login With Google"
          disabled={isLoading}
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
  orText: {
    fontSize: 12,
    color: colors.QUATERNARY_TEXT,
    fontWeight: 'bold',
    marginVertical: 14,
    alignSelf: 'center',
  },
});

export default LoginScreen;
