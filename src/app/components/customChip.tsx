import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import Typography from './typography';

import {Cross} from '../constant/icons';

type Props = {
  label: string;
  mode?: 'view' | 'edit';
  style?: ViewStyle;
};
const CustomChip = ({label, mode, style}: Props) => {
  return (
    <View style={[styles.containerStyle, style]}>
      {mode == 'edit' ? (
        <View style={styles.iconStyle}>
          <Cross />
        </View>
      ) : undefined}
      <Typography type="header" style={styles.textStyle}>
        {label}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#D0DDFF',
  },
  textStyle: {
    textAlign: 'center',
  },
  iconStyle: {
    alignSelf: 'flex-end',
    marginBottom: 3,
  },
});

export default CustomChip;
