import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
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
          <Text>{label}</Text>
        </View>
        {value.map(e => (
          <View style={styles.flexEnd}>
            <Text style={styles.value}>{e || '-'}</Text>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.flexStart}>
        <Text>{label}</Text>
      </View>
      <View style={styles.flexEnd}>
        <Text style={styles.value}>{value || '-'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {paddingVertical: 10, color: colors.SECONDARY_TEXT},
  value: {
    paddingVertical: 10,
    color: colors.SECONDARY,
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
