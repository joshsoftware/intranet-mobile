import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text} from 'react-native';

import {useLogin} from './login.hooks';

const LoginScreen = () => {
  const {signIn} = useLogin();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <Button title="Login With Google" onPress={signIn} />
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#707070',
  },
});
