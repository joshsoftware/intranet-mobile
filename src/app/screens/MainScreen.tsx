import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import MainNavigator from '../navigation/MainNavigator';
import Header from '../components/Header';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <MainNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#707070',
  },
});

export default MainScreen;
