import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {
  DatePickerOptions,
  BaseProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';
import {DatePickerProps} from 'react-native-date-picker';

import Touchable from '../touchable';
import Typography from '../typography';
import NativeDatePicker from './NativeDatePicker';

import {dateFormate} from '../../utils/date';

import fonts from '../../constant/fonts';
import colors from '../../constant/colors';
import {Calendar} from '../../constant/icons';

type Props = (BaseProps &
  DatePickerOptions &
  AndroidNativeProps &
  DatePickerProps) & {
  style?: ViewStyle;
  textStyle?: TextStyle;
  selectedDate?: Date;
  placeholder?: string;
  onDateChange: (date?: Date) => void;
  hideIcon?: boolean;
  error?: string;
};

const DatePicker = ({
  style,
  textStyle,
  selectedDate,
  placeholder,
  onDateChange,
  hideIcon = true,
  error,
  ...props
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = useCallback(() => setIsVisible(value => !value), []);

  return (
    <>
      <Touchable
        type="opacity"
        onPress={handleVisibility}
        style={[styles.picker, error ? styles.error : {}, style]}>
        <View>
          <Typography
            type="header"
            style={{
              ...(selectedDate ? styles.date : styles.placeholder),
              ...textStyle,
            }}>
            {selectedDate ? dateFormate(selectedDate) : placeholder}
          </Typography>
          {!hideIcon && <Calendar style={styles.icon} height={20} width={20} />}
          <NativeDatePicker
            open={isVisible}
            mode="date"
            onDateChange={onDateChange}
            togglePicker={handleVisibility}
            neutralButton={{label: 'Clear', textColor: 'grey'}}
            {...props}
          />
        </View>
      </Touchable>
      {error && (
        <Typography style={styles.errorText} type="description">
          {error}
        </Typography>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
  },
  date: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
    textAlignVertical: 'bottom',
    paddingHorizontal: 10,
    fontSize: 15,
  },
  placeholder: {
    color: colors.PLACEHOLDER_TEXT,
    fontFamily: fonts.OVERPASS,
    textAlignVertical: 'bottom',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  picker: {
    paddingVertical: 10,
    justifyContent: 'flex-end',
    borderBottomColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
    marginBottom: 3,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
  error: {
    borderBottomColor: colors.ERROR_RED,
  },
});

export default memo(DatePicker);
