import React, {useCallback} from 'react';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import {todaysDate} from '../../utils/date';

type Props = {
  open: boolean;
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
  togglePicker: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
};

function NativeDatePicker(props: Props) {
  const {open, onDateChange, togglePicker, minimumDate, maximumDate} = props;

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date: Date | undefined) => {
      togglePicker();
      event.type === 'neutralButtonPressed'
        ? onDateChange(undefined)
        : onDateChange(date);
    },
    [togglePicker, onDateChange],
  );

  if (!open) {
    return null;
  }

  return (
    <DateTimePicker
      mode="date"
      value={props.selectedDate || todaysDate()}
      onChange={handleDateChange}
      neutralButton={{label: 'Clear', textColor: 'grey'}}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  );
}

export default NativeDatePicker;
