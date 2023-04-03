import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../typography';

import {RightArrow} from '../../constant/icons';

import {flexStyles} from '../../../styles';

type Props = {
  name: string;
  email: string;
};

const EmployeeCard = ({name, email}: Props) => (
  <View style={[flexStyles.horizontal, styles.main]}>
    <View>
      <Typography type="header" style={styles.empName}>
        {name}
      </Typography>
      <Typography type="description" style={styles.empEmail}>
        {email}
      </Typography>
    </View>

    <RightArrow style={styles.arrow} />
  </View>
);

const styles = StyleSheet.create({
  empName: {
    margin: 12,
    marginBottom: 6,
  },
  empEmail: {
    marginStart: 12,
    marginBottom: 12,
  },
  arrow: {
    marginEnd: 10,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default memo(EmployeeCard);
