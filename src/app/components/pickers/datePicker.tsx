import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

import DateTimePicker, {
  DatePickerOptions,
  DateTimePickerEvent,
  BaseProps,
  IOSNativeProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';

import Typography from '../typography';

import {dateFormater} from '../../utils/dateFormater';

import fonts from '../../constant/fonts';
import colors from '../../constant/colors';
import {Calendar} from '../../constant/icons';

import {borderStyles, flexStyles} from '../../../styles';

type Props = (BaseProps &
  IOSNativeProps &
  DatePickerOptions &
  AndroidNativeProps) & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  selectedDate?: Date;
  placeholder?: string;
  onDateChange: (date?: Date) => void;
  hideIcon?: boolean;
};
const DatePicker = ({
  style,
  textStyle,
  selectedDate,
  placeholder,
  onDateChange,
  hideIcon = true,
  ...props
}: Props) => {
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const handleVisibility = useCallback(() => setIsVisible(value => !value), []);

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date: Date | undefined) => {
      event.type === 'neutralButtonPressed'
        ? onDateChange(undefined)
        : onDateChange(date);
      handleVisibility();
    },
    [handleVisibility, onDateChange],
  );

  return (
    <TouchableOpacity
      onPress={handleVisibility}
      style={[borderStyles.thinBorder, flexStyles.horizontal, style]}>
      <Typography
        type={'header'}
        style={{
          ...(selectedDate ? styles.date : styles.placeholder),
          ...textStyle,
        }}>
        {selectedDate ? dateFormater(selectedDate) : placeholder}
      </Typography>
      {!hideIcon && <Calendar style={styles.icon} />}
      {isVisible && (
        <DateTimePicker
          onChange={handleDateChange}
          neutralButton={{label: 'Clear', textColor: 'grey'}}
          {...props}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 9,
  },
  date: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
  },
  placeholder: {
    color: colors.PLACEHOLDER_TEXT,
    fontFamily: fonts.OVERPASS,
  },
});

export default memo(DatePicker);
