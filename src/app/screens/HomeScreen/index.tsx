import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import Calendar from './Calendar';

import colors from '../../constant/colors';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Calendar />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default HomeScreen;
