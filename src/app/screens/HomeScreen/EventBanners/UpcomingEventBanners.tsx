import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import EventBanner from '../../../components/EventBanner';
import {useUpcomingEvents} from '../dashboard.hooks';
import colors from '../../../constant/colors';

const UpcomingEventBanners = () => {
  const {events} = useUpcomingEvents();

  const bannerCards = events.map(event => (
    <View key={event.id}>
      <Text style={styles.title}>{event.title}</Text>
      <EventBanner uri={event.promotional_banner} />
    </View>
  ));

  return <View>{bannerCards}</View>;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: colors.SECONDARY,
    textAlign: 'center',
    padding: 10,
  },
});

export default UpcomingEventBanners;
