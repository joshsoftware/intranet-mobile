import React, {useCallback} from 'react';
import DateTimePicker, {
  DatePickerOptions,
  DateTimePickerEvent,
  BaseProps,
  AndroidNativeProps,
} from '@react-native-community/datetimepicker';

type Props = (BaseProps & DatePickerOptions & AndroidNativeProps) & {
  open: boolean;
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
  togglePicker: () => void;
};

function NativeDatePicker(props: Props) {
  const {open, onDateChange, togglePicker} = props;

  const handleDateChange = useCallback(
    (event: DateTimePickerEvent, date: Date | undefined) => {
      event.type === 'neutralButtonPressed'
        ? onDateChange(undefined)
        : onDateChange(date);
      togglePicker();
    },
    [togglePicker, onDateChange],
  );

  if (!open) {
    return null;
  }

  return (
    <DateTimePicker
      mode="date"
      onChange={handleDateChange}
      neutralButton={{label: 'Clear', textColor: 'grey'}}
      {...props}
    />
  );
}

export default NativeDatePicker;
