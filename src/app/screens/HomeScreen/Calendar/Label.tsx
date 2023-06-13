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
    <View style={[styles.container, {backgroundColor: color}]}>
      <Typography type="header">{count}</Typography>
      <Typography type="header" style={styles.labelText}>
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
  },
  labelText: {
    fontSize: 12,
  },
});

export default Label;
