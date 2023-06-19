import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import {dateFormate} from '../../../utils/date';

type ItemProps = {
  name: string;
  from: string;
  to: string;
  days: number;
};

const LeaveCard = ({name, from, to, days}: ItemProps) => (
  <View style={styles.item}>
    <Typography type="header">{name}</Typography>
    <Typography type="label">
      {days === 1
        ? `Leave on ${dateFormate(from, 'll')}`
        : `Leave From: ${dateFormate(from, 'll')} To: ${dateFormate(to, 'll')}`}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    gap: 6,
    paddingVertical: 12,
  },
});

export default memo(LeaveCard);
