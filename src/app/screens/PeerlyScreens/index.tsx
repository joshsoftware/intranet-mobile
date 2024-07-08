import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Text} from 'react-native';

import colors from '../../constant/colors';

const PeerlyScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <Text>Hey Peerly</Text>
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

export default PeerlyScreen;
