import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import CustomTabView from './customTabView';
import Header from '../../components/Header';

const UserProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header onMainScreen={false} />
      <CustomTabView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserProfile;
