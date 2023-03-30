import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useLogin} from './login.hooks';
import JoshLogo from '../../../assets/svg/logo.svg';
import LoginForm from './LoginForm';

const LoginScreen = () => {
  const {googleSignInHandler, emailPasswordSignInHandler, isLoading} =
    useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <JoshLogo />
        </View>

        <Text style={styles.loginText}>Login</Text>

        <LoginForm signIn={emailPasswordSignInHandler} isLoading={isLoading} />

        <Text style={styles.orText}>Or</Text>

        <TouchableOpacity
          style={styles.googleSigninButton}
          activeOpacity={0.5}
          onPress={googleSignInHandler}
          disabled={isLoading}>
          <Text style={styles.googleSigninButtonText}>Login With Google</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    color: '#333333',
    paddingVertical: 20,
  },

  googleSigninButton: {
    backgroundColor: '#FFFFFF',
    padding: 9,
    borderRadius: 4,
    alignItems: 'center',
    borderColor: '#3069F6',
    borderWidth: 2,
  },
  googleSigninButtonText: {
    color: '#3069F6',
    fontSize: 14,
    fontWeight: '600',
  },
  orText: {
    fontSize: 12,
    color: '#6A6A6A',
    fontWeight: 'bold',
    marginVertical: 14,
    alignSelf: 'center',
  },
});
