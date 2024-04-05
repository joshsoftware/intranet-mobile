import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView} from 'react-native';

import Calendar from './Calendar';
import UpcomingEventBanners from './EventBanners/UpcomingEventBanners';
import TeamMembersLeaves from './teamMembersLeaves';
import TeamMembersBirthdays from './TeamMembersBirthdays';
import LiveEventBanners from './EventBanners/LiveEventBanners';

import colors from '../../constant/colors';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Calendar />
        <LiveEventBanners />
        <UpcomingEventBanners />
        <TeamMembersLeaves />
        <TeamMembersBirthdays />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  scrollViewContentContainer: {
    paddingBottom: 72,
  },
});

export default HomeScreen;
