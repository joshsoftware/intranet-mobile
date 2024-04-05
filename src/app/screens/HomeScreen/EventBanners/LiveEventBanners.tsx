import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';

import EventBanner from '../../../components/EventBanner';
import {useLiveEvents} from '../dashboard.hooks';

import toast from '../../../utils/toast';
import colors from '../../../constant/colors';

const LiveEventBanners = () => {
  const {events} = useLiveEvents();

  const handleOpenEvent = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        Linking.openURL(url);
      }
    } catch {
      toast('Could not open event!');
    }
  };

  const bannerCards = events.map(event => (
    <TouchableOpacity
      key={event.id}
      onPress={() => handleOpenEvent(event.google_form_link)}
      activeOpacity={0.5}>
      <View>
        <Text style={styles.title}>{event.title}</Text>
        <EventBanner uri={event.live_banner} />
      </View>
    </TouchableOpacity>
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

export default LiveEventBanners;
