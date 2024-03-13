import React, {memo} from 'react';
import {StyleSheet, View, Text, Platform} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Typography from '../../../components/typography';

import {navigate} from '../../../navigation';
import {dateFormate} from '../../../utils/date';

import {Arrow, Lock} from '../../../constant/icons';
import {USER_TIMESHEET} from '../../../constant/screenNames';
import {ISO_DATE_FROMAT} from '../../../constant/date';
import {TimesheetStatus} from '../interface';
import colors from '../../../constant/colors';
import Touchable from '../../../components/touchable';

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
  projectFilter?: string;
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
    projectFilter = '',
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
      projectFilter: projectFilter,
    });

  const isFreezed = worked_minutes === 0;

  const hours = Math.floor(worked_minutes / 60);
  const minutes = Math.floor(worked_minutes % 60);

  return (
    <Touchable
      type={Platform.OS === 'ios' ? 'opacity' : 'native'}
      onPress={handleNavigation}>
      <View style={styles.container}>
        {showCheckbox && !isFreezed && (
          <View style={styles.checkBoxContainer}>
            <Touchable type="none" onPress={e => e.stopPropagation()}>
              <CheckBox
                value={isChecked}
                onTintColor={isErrored ? colors.ERROR_RED : colors.PRIMARY}
                onCheckColor={isErrored ? colors.ERROR_RED : colors.PRIMARY}
                onValueChange={toggleCheckbox}
                tintColors={{
                  true: isErrored ? colors.ERROR_RED : colors.PRIMARY,
                }}
              />
            </Touchable>
          </View>
        )}

        <View
          style={[
            styles.main,
            showCheckbox && !isFreezed ? styles.mainWithCheckbox : {},
          ]}>
          <View style={styles.infoContainer}>
            <Typography type="header" style={styles.empName}>
              {name} {formatTimeString(hours, minutes)}
            </Typography>
            <Typography type="description">{email}</Typography>
          </View>
          {isFreezed ? (
            <View style={styles.freezedContainer}>
              <Lock height={18} fill={colors.PRIMARY} />
              <Text style={styles.freezedText}>Freezed</Text>
            </View>
          ) : (
            <View style={styles.arrowContainer}>
              <Arrow />
            </View>
          )}
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
  infoContainer: {
    flex: 1,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  freezedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  freezedText: {
    fontSize: 12,
    color: colors.PRIMARY,
    fontWeight: 'bold',
  },
});

export default memo(EmployeeCard);
