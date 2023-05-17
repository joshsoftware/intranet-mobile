import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../../../components/typography';
import Touchable from '../../../components/touchable';

import {dateFormate} from '../../../utils/date';

import {Delete, Edit} from '../../../constant/icons';
import {Timesheet} from '../interface';

type Props = {
  timesheetData: Timesheet;
  title: string;
  onEdit?: Function;
  onDelete?: Function;
  isDeleteVisible?: boolean;
};

const TimesheetItem = ({
  timesheetData,
  title,
  onEdit,
  onDelete,
  isDeleteVisible = true,
}: Props) => {
  const handleEdit = () =>
    onEdit?.({
      ...timesheetData,
      project_title: title,
    });

  const handleDelete = () =>
    onDelete?.({
      ...timesheetData,
      project_title: title,
    });

  return (
    <View style={styles.container}>
      <View style={styles.titleContent}>
        <View>
          <Typography type="header">
            {dateFormate(timesheetData.date)}
          </Typography>
          <Typography type="subheader" style={styles.workedHours}>
            {timesheetData.work_in_hours}
          </Typography>
        </View>
        <View style={styles.buttons}>
          {onEdit && (
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
      </View>
      <Typography type="description">{timesheetData.description}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
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
});

export default memo(TimesheetItem);
