import React from 'react';

import {StyleSheet, View} from 'react-native';

import colors from '../../constant/colors';

const PrimaryDivider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.PRIMARY_DIVIDER,
  },
});

export default PrimaryDivider;
