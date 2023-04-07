import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import Typography from '../../../components/typography';

import {Timesheet} from '../interfaces';

import {Delete, Edit} from '../../../constant/icons';

type Props = {
  style?: ViewStyle;
  timesheetData: Timesheet;
  title: string;
  onEdit?: Function;
  onDelete?: Function;
};

const TimesheetItem = ({
  timesheetData,
  title,
  onEdit,
  onDelete,
  style,
}: Props) => {
  const handleEdit = () => onEdit?.({...timesheetData, project: title});

  const handleDelete = () => onDelete?.({...timesheetData, project: title});

  return (
    <View style={style}>
      <Typography type="header">{timesheetData.date}</Typography>
      <Typography type="subheader" style={styles.workedHours}>
        {timesheetData.work_in_hours}
      </Typography>
      <Typography type="description">{timesheetData.description}</Typography>
      <View style={styles.buttons}>
        {onEdit && (
          <TouchableOpacity onPress={handleEdit}>
            <Edit />
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity onPress={handleDelete}>
            <Delete />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  workedHours: {
    marginTop: 4,
    marginBottom: 8,
  },
  buttons: {
    width: '20%',
    position: 'absolute',
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
export default memo(TimesheetItem);
