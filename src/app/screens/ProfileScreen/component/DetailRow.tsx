import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

interface Props {
  label: string;
  value: number | string | null | undefined;
}

function DetailRow({label, value}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.flexStart}>
        <Typography type="secondaryText">{label}</Typography>
      </View>
      <View style={styles.flexEnd}>
        <Typography type="text">{value || '-'}</Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  flexStart: {
    flex: 1,
    alignContent: 'flex-start',
  },
  flexEnd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default React.memo(DetailRow);
