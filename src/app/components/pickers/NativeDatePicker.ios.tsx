import React from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';

type Props = DatePickerProps & {
  open: boolean;
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
  togglePicker: () => void;
};

function NativeDatePicker(props: Props) {
  const {
    open,
    onDateChange,
    togglePicker,
    selectedDate,
    minimumDate,
    maximumDate,
  } = props;

  return (
    <DatePicker
      modal
      mode="date"
      open={open}
      date={selectedDate || new Date()}
      onConfirm={onDateChange}
      onCancel={togglePicker}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  );
}

export default NativeDatePicker;
