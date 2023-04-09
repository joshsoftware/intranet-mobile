import React from 'react';
import {View, StyleSheet, ViewStyle, TouchableOpacity} from 'react-native';

import Typography from './typography';

import {Cross} from '../constant/icons';

type Props = {
  label: string;
  mode?: 'view' | 'edit';
  style?: ViewStyle;
  onDeleteOtherSkills?: (skill: string) => void;
};
const CustomChip = ({label, mode, style, onDeleteOtherSkills}: Props) => {
  console.log(label);
  return (
    <View style={[styles.containerStyle, style]}>
      <Typography type="header" style={styles.textStyle}>
        {label}
      </Typography>
      {mode === 'edit' && (
        <TouchableOpacity
          onPress={() => onDeleteOtherSkills(label)}
          style={styles.iconStyle}>
          <Cross />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#D0DDFF',
    marginLeft: 10,
    marginBottom: 10,
  },
  textStyle: {
    textAlign: 'center',
  },
  iconStyle: {
    marginLeft: 6,
  },
});

export default CustomChip;
