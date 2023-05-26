import React from 'react';
import {View, StyleSheet} from 'react-native';
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
      <CheckBox value={checked} onValueChange={onPress} />
      <Typography type="text">{label}</Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckBoxField;
