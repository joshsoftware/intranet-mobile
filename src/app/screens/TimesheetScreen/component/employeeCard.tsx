import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';

import {navigate} from '../../../navigation';
import {dateFormate} from '../../../utils/date';

import {Arrow} from '../../../constant/icons';
import {USER_TIMESHEET} from '../../../constant/screenNames';
import {ISO_DATE_FROMAT} from '../../../constant/date';
import { TimesheetStatus } from '../interface';

type Props = {
  name: string;
  email: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  worked_minutes: number;
  status?: TimesheetStatus;
};

const EmployeeCard = (props: Props) => {
  const {name, email, userId, startDate, endDate, worked_minutes, status} = props;

  const handleNavigation = () =>
    navigate(USER_TIMESHEET, {
      name,
      email,
      user_id: userId,
      startDate: dateFormate(startDate, ISO_DATE_FROMAT),
      endDate: dateFormate(endDate, ISO_DATE_FROMAT),
      status: status,
    });

  const hours = Math.floor(worked_minutes / 60);
  const minutes = Math.floor(worked_minutes % 60);

  return (
    <Touchable type="native" onPress={handleNavigation}>
      <View style={styles.main}>
        <View>
          <Typography type="header" style={styles.empName}>
            {name} {formatTimeString(hours, minutes)}
          </Typography>
          <Typography type="description">{email}</Typography>
        </View>
        <Arrow />
      </View>
    </Touchable>
  );
};

const formatTimeString = (hours: number, minutes: number) => {
  const hourString = hours === 1 ? '1 hour' : hours + ' hours';
  const minuteString = minutes === 1 ? '1 minute' : minutes + ' minutes';

  return '(' + hourString + (minutes > 0 ? ' ' + minuteString : '') + ')';
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
