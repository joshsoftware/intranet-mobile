import React from 'react';
import {StyleSheet, View} from 'react-native';

import Typography from '../typography';
import DatePicker from './datePicker';

type Props = {
  startDate: Date;
  endDate: Date;
  minimumDate?: Date;
  maximumDate?: Date;
  onChange: (startDate: Date, endDate: Date) => void;
};

function DateRangePicker(props: Props) {
  const {onChange, startDate, endDate, minimumDate, maximumDate} = props;

  const handleStartDateChange = (date?: Date) => {
    if (date) {
      onChange(date, endDate);
    }
  };

  const handleEndDateChange = (date?: Date) => {
    if (date) {
      onChange(startDate, date);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Typography type="header">From</Typography>
        <DatePicker
          selectedDate={startDate}
          hideIcon
          onDateChange={handleStartDateChange}
          minimumDate={minimumDate}
          maximumDate={endDate}
        />
      </View>

      <View style={styles.subContainer}>
        <Typography type="header">To</Typography>
        <DatePicker
          selectedDate={endDate}
          hideIcon
          onDateChange={handleEndDateChange}
          minimumDate={startDate}
          maximumDate={maximumDate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});

export default DateRangePicker;
