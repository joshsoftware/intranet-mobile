import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import EventBanner from '../../../components/EventBanner';
import {useLiveEvents} from '../dashboard.hooks';

import toast from '../../../utils/toast';
import colors from '../../../constant/colors';

const LiveEventBanners = () => {
  const navigation = useNavigation();
  const {events, isLoading, refetch} = useLiveEvents();

  useEffect(() => {
    return navigation.addListener('focus', () => refetch());
  }, [navigation, refetch]);

  if (events.length === 0 || isLoading) {
    return null;
  }

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
        <EventBanner uri={event.live_banner} />
      </View>
    </TouchableOpacity>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Live Events</Text>
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

export default LiveEventBanners;
