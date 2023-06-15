import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import {dateFormate} from '../../../utils/date';

type ItemProps = {
  name: string;
  date: string;
};

const BirthdayCard = ({name, date}: ItemProps) => (
  <View style={styles.item}>
    <Typography type="header">{name}</Typography>
    <Typography type="label">Birthday on {dateFormate(date)}</Typography>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    gap: 6,
    paddingVertical: 12,
  },
});

export default memo(BirthdayCard);
