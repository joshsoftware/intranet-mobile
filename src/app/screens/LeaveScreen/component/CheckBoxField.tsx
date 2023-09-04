import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Typography from '../../../components/typography';

interface Props {
  checked: boolean;
  label: string;
  onPress: (value: boolean) => void;
}

function CheckBoxField({checked, label, onPress}: Props) {
  return (
    <View style={styles.container}>
      <CheckBox
        style={styles.checkbox}
        value={checked}
        onValueChange={onPress}
      />
      <Typography type="text">{label}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {gap: 10},
      android: {},
    }),
  },
  checkbox: {
    ...Platform.select({
      ios: {height: 15, width: 15},
      android: {},
    }),
  },
});

export default React.memo(CheckBoxField);
