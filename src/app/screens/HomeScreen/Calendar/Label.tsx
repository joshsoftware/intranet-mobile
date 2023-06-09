import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

interface Props {
  count: number;
  color: string;
  borderColor: string;
  text: string;
}

function Label({count = 0, color, borderColor, text}: Props) {
  return (
    <View style={styles.container}>
      <Typography type="header" style={{color: borderColor}}>
        {count}
      </Typography>
      <View style={styles.row}>
        <View
          style={[
            styles.dot,
            {backgroundColor: color, borderColor: borderColor},
          ]}
        />
        <Typography type="header" style={styles.labelText}>
          {text}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
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
