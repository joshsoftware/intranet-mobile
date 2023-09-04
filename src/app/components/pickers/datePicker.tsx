import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import Touchable from '../touchable';
import Typography from '../typography';
import NativeDatePicker from './NativeDatePicker';

import {dateFormate, todaysDate} from '../../utils/date';

import fonts from '../../constant/fonts';
import colors from '../../constant/colors';
import {Calendar} from '../../constant/icons';

type Props = {
  style?: ViewStyle;
  textStyle?: TextStyle;
  selectedDate?: Date;
  placeholder?: string;
  minimumDate?: Date;
  maximumDate?: Date;
  onDateChange: (date?: Date) => void;
  hideIcon?: boolean;
  error?: string;
};

const DatePicker = (props: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const openPicker = useCallback(() => setIsVisible(true), []);
  const closePicker = useCallback(() => setIsVisible(false), []);

  let fieldText = 'Select Date';

  if (props.selectedDate) {
    fieldText = dateFormate(props.selectedDate);
  } else if (props.placeholder) {
    fieldText = props.placeholder;
  }

  return (
    <>
      <Touchable
        type="opacity"
        onPress={openPicker}
        style={[
          styles.picker,
          props.error ? styles.error : {},
          props.hideIcon ? styles.pickerHiddenIcon : {},
        ]}>
        <Typography
          type="header"
          style={props.selectedDate ? styles.date : styles.placeholder}>
          {fieldText}
        </Typography>
        {!props.hideIcon && <Calendar height={20} width={20} />}
        <NativeDatePicker
          selectedDate={props.selectedDate ?? todaysDate}
          open={isVisible}
          onDateChange={props.onDateChange}
          togglePicker={closePicker}
          minimumDate={props.minimumDate}
          maximumDate={props.maximumDate}
        />
      </Touchable>
      {props.error && (
        <Typography style={styles.errorText} type="description">
          {props.error}
        </Typography>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  date: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  placeholder: {
    color: colors.PLACEHOLDER_TEXT,
    fontFamily: fonts.OVERPASS,
    fontSize: 14,
  },
  picker: {
    flex: 1,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.TEXT_INPUT_BORDER,
    borderBottomWidth: 1,
  },
  errorText: {
    color: colors.ERROR_RED,
  },
  error: {
    borderBottomColor: colors.ERROR_RED,
  },
  pickerHiddenIcon: {
    justifyContent: 'center',
  },
});

export default memo(DatePicker);
