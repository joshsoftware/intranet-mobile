import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import colors from '../constant/colors';
import {JoshLogo} from '../constant/icons';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <JoshLogo />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
});

export default SplashScreen;
