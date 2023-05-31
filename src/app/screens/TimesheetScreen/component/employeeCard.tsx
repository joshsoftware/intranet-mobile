import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';

import {navigate} from '../../../navigation';
import {dateFormate} from '../../../utils/date';

import {Arrow} from '../../../constant/icons';
import {USER_TIMESHEET} from '../../../constant/screenNames';
import {ISO_DATE_FROMAT} from '../../../constant/date';

type Props = {
  name: string;
  email: string;
  userId: string;
  startDate: Date;
  endDate: Date;
};

const EmployeeCard = ({name, email, userId, startDate, endDate}: Props) => {
  const handleNavigation = () =>
    navigate(USER_TIMESHEET, {
      name,
      email,
      user_id: userId,
      startDate: dateFormate(startDate, ISO_DATE_FROMAT),
      endDate: dateFormate(endDate, ISO_DATE_FROMAT),
    });

  return (
    <Touchable type="native" onPress={handleNavigation}>
      <View style={styles.main}>
        <View>
          <Typography type="header" style={styles.empName}>
            {name}
          </Typography>
          <Typography type="description">{email}</Typography>
        </View>
        <Arrow />
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  empName: {
    paddingBottom: 7,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default memo(EmployeeCard);
