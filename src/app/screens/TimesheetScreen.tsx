import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const TimesheetScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Timesheet Screen</Text>
    </SafeAreaView>
  );
};

export default TimesheetScreen;

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