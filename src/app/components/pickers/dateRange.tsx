import React, {memo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import DatePicker from './datePicker';
import Linear from '../seperator/linear';

import strings from '../../constant/strings';

type Props = {
  style?: ViewStyle;
  startDate: Date | undefined;
  endDate: Date | undefined;
  onChange: (date: Date | undefined, isStart: boolean) => void;
};

const DateRange = ({style, startDate, endDate, onChange}: Props) => {
  return (
    <View style={[styles.main, style]}>
      <DatePicker
        initialDate={startDate ? startDate : new Date()}
        selectedDate={startDate}
        placeHolder={strings.FROM}
        onChange={onChange}
        maximumDate={endDate}
        style={styles.leftDatePicker}
      />

      <Linear />

      <DatePicker
        initialDate={endDate ? endDate : new Date()}
        selectedDate={endDate}
        placeHolder={strings.TO}
        onChange={onChange}
        hideIcon={false}
        minimumDate={startDate}
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
