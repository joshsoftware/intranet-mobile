import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Touchable from '../../../components/touchable';
import Typography from '../../../components/typography';

import {navigate} from '../../../navigation';
import {dateFormate} from '../../../utils/date';

import {Arrow} from '../../../constant/icons';
import {USER_TIMESHEET} from '../../../constant/screenNames';
import {ISO_DATE_FROMAT} from '../../../constant/date';
import {TimesheetStatus} from '../interface';
import colors from '../../../constant/colors';

type Props = {
  name: string;
  email: string;
  userId: string;
  startDate: Date;
  endDate: Date;
  worked_minutes: number;
  isErrored?: boolean;
  status?: TimesheetStatus;
  showCheckbox?: boolean;
  isChecked?: boolean;
  toggleCheckbox: () => void;
};

const EmployeeCard = (props: Props) => {
  const {
    name,
    email,
    userId,
    startDate,
    endDate,
    worked_minutes,
    status,
    isErrored = false,
    isChecked = false,
    showCheckbox = false,
    toggleCheckbox,
  } = props;

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
      <View style={styles.container}>
        {showCheckbox && (
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={isChecked}
              onChange={toggleCheckbox}
              tintColors={{
                true: isErrored ? colors.ERROR_RED : colors.PRIMARY,
              }}
            />
          </View>
        )}
        <View
          style={[styles.main, showCheckbox ? styles.mainWithCheckbox : {}]}>
          <View>
            <Typography type="header" style={styles.empName}>
              {name} {formatTimeString(hours, minutes)}
            </Typography>
            <Typography type="description">{email}</Typography>
          </View>
          <View style={styles.arrowContainer}>
            <Arrow />
          </View>
        </View>
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
  container: {
    flexDirection: 'row',
  },
  empName: {
    paddingBottom: 7,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    gap: 16,
    paddingHorizontal: 16,
  },
  mainWithCheckbox: {
    paddingLeft: 0,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(EmployeeCard);
