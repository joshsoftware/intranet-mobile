import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import colors from '../../../constant/colors';

interface Props {
  children: React.ReactNode;
}

function ScreenWrapper({children}: Props) {
  return <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});

export default ScreenWrapper;
