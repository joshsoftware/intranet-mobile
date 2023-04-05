import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import DatePicker from './datePicker';
import Linear from '../seperator/linear';

import strings from '../../constant/strings';

type Props = {
  style?: ViewStyle;
  startDate?: Date;
  endDate?: Date;
  onChangeStart: (date?: Date) => void;
  onChangeEnd: (date?: Date) => void;
};

const DateRange = ({
  style,
  startDate,
  endDate,
  onChangeStart,
  onChangeEnd,
}: Props) => {
  return (
    <View style={[styles.main, style]}>
      <DatePicker
        value={startDate ? startDate : new Date()}
        selectedDate={startDate}
        placeholder={strings.FROM}
        onDateChange={onChangeStart}
        maximumDate={endDate ? endDate : new Date()}
        style={styles.leftDatePicker}
      />

      <Linear />

      <DatePicker
        value={endDate ? endDate : new Date()}
        selectedDate={endDate}
        placeholder={strings.TO}
        onDateChange={onChangeEnd}
        hideIcon={false}
        minimumDate={startDate}
        maximumDate={new Date()}
        style={styles.rightDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: '100%',
    flexDirection: 'row',
    height: 40,
  },
  leftDatePicker: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    borderEndWidth: 0,
    borderTopEndRadius: 0,
    borderBottomEndRadius: 0,
  },
  rightDatePicker: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderStartWidth: 0,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
  },
});

export default memo(DateRange);
