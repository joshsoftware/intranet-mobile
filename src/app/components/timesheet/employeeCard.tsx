import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../typography';

import {RightArrow} from '../../constant/icons';

import {flexStyles} from '../../../styles';

type Props = {
  details: {
    employee_id: string;
    name: string;
    email: string;
  };
};

const EmployeeCard = ({details}: Props) => (
  <View style={[flexStyles.horizontal, styles.main]}>
    <View>
      <Typography type="header" style={styles.empName}>
        {details.name}
      </Typography>
      <Typography type="description" style={styles.empEmail}>
        {details.email}
      </Typography>
    </View>

    <RightArrow style={styles.arrow} />
  </View>
);

const styles = StyleSheet.create({
  empName: {margin: 12, marginBottom: 6},
  empEmail: {
    marginStart: 12,
    marginBottom: 12,
  },
  arrow: {
    position: 'absolute',
    right: 20,
  },
  main: {
    justifyContent: 'flex-start',
  },
});

export default memo(EmployeeCard);
