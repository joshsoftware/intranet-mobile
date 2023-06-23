import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';

import {dateFormate} from '../../../utils/date';

import {BirthdayCake} from '../../../constant/icons';

type ItemProps = {
  name: string;
  date: string;
};

const BirthdayCard = ({name, date}: ItemProps) => (
  <View style={styles.item}>
    <Typography type="header">{name}</Typography>
    <View style={styles.row}>
      <BirthdayCake height={20} width={20} />
      <Typography type="label">{dateFormate(date, 'MMMM DD')}</Typography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'column',
    gap: 6,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'flex-end',
  },
});

export default memo(BirthdayCard);
