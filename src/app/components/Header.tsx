import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {JoshLogo, Profile} from '../constant/icons';
import colors from '../constant/colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <JoshLogo height={18} width={85} fill={colors.WHITE} />
      <TouchableOpacity activeOpacity={0.5}>
        <Profile height={18} width={18} fill={colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingTop: 26,
    paddingBottom: 18,
    paddingLeft: 16,
    paddingRight: 23,

    backgroundColor: colors.PRIMARY,
  },
});

export default Header;
