import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import colors from '../../constant/colors';

function LoadingSpinner() {
  return (
    <View style={styles.container}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerContainer: {
    padding: 20,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
  },
});

export default LoadingSpinner;