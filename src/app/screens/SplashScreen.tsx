import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import JoshLogo from '../../assets/svg/logo.svg';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <JoshLogo />
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});
