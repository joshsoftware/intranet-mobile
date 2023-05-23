import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import colors from '../../../constant/colors';

interface Props {
  label: string;
  value: (string | null | undefined)[] | string | null | undefined;
}

function DetailRow({label, value}: Props) {
  if (Array.isArray(value)) {
    return (
      <View style={styles.container}>
        <View style={styles.flexStart}>
          <Typography type="secondaryLabel">{label}</Typography>
        </View>
        {value.map(e => (
          <View style={styles.flexEnd}>
            <Typography type="text">{e || '-'}</Typography>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexStart}>
        <Typography type="secondaryLabel">{label}</Typography>
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
  label: {paddingVertical: 10, color: colors.SECONDARY_TEXT},
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
