import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

interface Props {
  count: number;
  color: string;
  text: string;
}

function Label({count = 0, color, text}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.countView, {backgroundColor: color}]}>
        <Typography type="header">{count}</Typography>
      </View>
      <Typography type="label" style={styles.labelText}>
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 5,
  },
  countView: {
    width: 25,
    height: 25,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 12,
  },
});

export default Label;
