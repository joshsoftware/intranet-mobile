import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import TeamMembersLeaves from './teamMembersLeaves';

import fonts from '../../constant/fonts';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TeamMembersLeaves />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: fonts.ARIAL_BOLD,
  },
});

export default HomeScreen;
