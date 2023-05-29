import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

// import LoginForm from './LoginForm';
import Button from '../../components/button';
import {useLogin} from './login.hooks';

// import colors from '../../constant/colors';
import {JoshLogo} from '../../constant/icons';

const LoginScreen = () => {
  const {googleSignInHandler, isLoading} = useLogin();

  useEffect(() => {
    googleSignInHandler();
  }, [googleSignInHandler]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <JoshLogo />
      </View>

      {/* <Text style={styles.loginText}>LOGIN</Text> */}
      {/* <LoginForm signIn={emailPasswordSignInHandler} isLoading={isLoading} /> */}
      {/* <Text style={styles.orText}>Or</Text> */}

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
  // loginText: {
  //   fontSize: 22,
  //   fontWeight: 'bold',
  //   color: colors.TERTIARY_TEXT,
  //   paddingVertical: 20,
  // },
  // orText: {
  //   fontSize: 12,
  //   color: colors.QUATERNARY_TEXT,
  //   fontWeight: 'bold',
  //   marginVertical: 14,
  //   alignSelf: 'center',
  // },
});

export default LoginScreen;
