import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {JoshLogo, Profile} from '../constant/icons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import {USER_PROFILE_SCREEN} from '../constant/screenNames';

const ScreenHeader = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <JoshLogo height={40} width={80} />
      <TouchableOpacity
        style={styles.circle}
        onPress={() => {
          navigation.navigate(USER_PROFILE_SCREEN);
        }}>
        <Profile />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    padding: 10,
  },

  circle: {
    height: 34,
    width: 34,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenHeader;
