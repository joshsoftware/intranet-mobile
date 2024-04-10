import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import EventBanner from '../../../components/EventBanner';
import {useUpcomingEvents} from '../dashboard.hooks';
import colors from '../../../constant/colors';

const UpcomingEventBanners = () => {
  const {events} = useUpcomingEvents();

  if (events.length === 0) {
    return null;
  }

  const bannerCards = events.map(event => (
    <View key={event.id}>
      <EventBanner uri={event.promotion_banner} />
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Upcoming Events</Text>
      {bannerCards}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 10,
  },
  title: {
    fontWeight: 'bold',
    color: colors.SECONDARY,
    textAlign: 'center',
    padding: 10,
  },
  mainTitle: {
    fontWeight: 'bold',
    color: colors.SECONDARY,
    paddingHorizontal: 16,
  },
});

export default UpcomingEventBanners;
