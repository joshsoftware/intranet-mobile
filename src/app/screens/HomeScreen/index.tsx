import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import TeamMembersLeaves from './teamMembersLeaves';

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
});

export default HomeScreen;
