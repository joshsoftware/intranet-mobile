import React, {memo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import Typography from '../../../components/typography';
import Touchable from '../../../components/touchable';

import {dateFormate} from '../../../utils/date';

import {Delete, Edit, Lock} from '../../../constant/icons';
import {Timesheet} from '../interface';
import colors from '../../../constant/colors';

type Props = {
  timesheetData: Timesheet;
  // title: string;
  onEdit?: Function;
  onDelete?: Function;
  isEditVisible?: boolean;
  isDeleteVisible?: boolean;
  showCheckbox?: boolean;
  isChecked?: boolean;
  error?: string;
  toggleCheckbox: () => void;
};

const TimesheetItem = ({
  timesheetData,
  // title,
  onEdit,
  onDelete,
  isEditVisible = true,
  isDeleteVisible = true,
  showCheckbox = true,
  isChecked = false,
  error,
  toggleCheckbox,
}: Props) => {
  const handleEdit = () =>
    onEdit?.({
      ...timesheetData,
      // project_title: title,
    });

  const handleDelete = () =>
    onDelete?.({
      ...timesheetData,
      // project_title: title,
    });

  const hours = Math.floor(timesheetData.worked_minutes / 60);
  const minutes = Math.floor(timesheetData.worked_minutes % 60).toLocaleString(
    'en-US',
    {minimumIntegerDigits: 2, useGrouping: false},
  );

  return (
    <View style={styles.container}>
      {!timesheetData.is_freezed && showCheckbox && (
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            tintColors={{
              true: error ? colors.ERROR_RED : colors.PRIMARY,
            }}
            onChange={toggleCheckbox}
          />
        </View>
      )}
      <View style={styles.main}>
        <View style={styles.titleContent}>
          <View>
            <Typography type="header">
              {dateFormate(timesheetData.date)}
            </Typography>
            <Typography type="subheader" style={styles.workedHours}>
              {hours}:{minutes}
            </Typography>
          </View>
          {timesheetData.is_freezed ? (
            <View style={styles.freezedContainer}>
              <Lock height={18} fill={colors.PRIMARY} />
              <Text style={styles.freezedText}>Freezed</Text>
            </View>
          ) : (
            <View style={styles.buttons}>
              {onEdit && isEditVisible && (
                <Touchable type="opacity" onPress={handleEdit}>
                  <Edit width={20} height={20} />
                </Touchable>
              )}
              {onDelete && isDeleteVisible && (
                <Touchable type="opacity" onPress={handleDelete}>
                  <Delete width={20} height={20} />
                </Touchable>
              )}
            </View>
          )}
        </View>
        <Typography type="description">{timesheetData.description}</Typography>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 10,
  },
  main: {
    flex: 1,
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
  checkboxContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workedHours: {
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 12,
    right: 6,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
});

export default memo(TimesheetItem);
