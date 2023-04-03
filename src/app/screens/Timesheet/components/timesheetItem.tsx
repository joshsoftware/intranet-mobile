import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';

import Typography from '../../../components/typography';

import {Delete, Edit} from '../../../constant/icons';

interface Timesheet {
  timesheet_id: string;
  date: string;
  work_in_hours: string;
  description: string;
}

type Props = {
  style?: ViewStyle;
  data: Timesheet;
};

const TimesheetItem = ({style, data}: Props) => (
  <View style={[style]}>
    <Typography type="header">{data.date}</Typography>
    <Typography type="subheader" style={styles.workedHours}>
      {data.work_in_hours}
    </Typography>
    <Typography type="description">{data.description}</Typography>
    <View style={styles.buttons}>
      <TouchableOpacity onPress={() => console.log('delete Pressed')}>
        <Delete />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log('edit Pressed')}>
        <Edit />
      </TouchableOpacity>
    </View>
  </View>
);

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
