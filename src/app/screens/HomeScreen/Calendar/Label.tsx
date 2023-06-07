import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

interface Props {
  color: string;
  borderColor: string;
  text: string;
}

function Label({color, borderColor, text}: Props) {
  return (
    <View style={styles.container}>
      <View
        style={[styles.dot, {backgroundColor: color, borderColor: borderColor}]}
      />
      <Typography type="header" style={styles.labelText}>
        {text}
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 7,
    width: 7,
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 5,
  },
  labelText: {
    fontSize: 12,
  },
});

export default Label;
