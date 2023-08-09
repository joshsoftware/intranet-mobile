import React, {useCallback} from 'react';
import DatePicker from 'react-native-date-picker';
import {dateFormate} from '../../utils/date';

type Props = {
  open: boolean;
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
  togglePicker: () => void;
  minimumDate?: Date;
  maximumDate?: Date;
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

  const handleDateChange = useCallback(
    (date: Date) => {
      if (date) {
        onDateChange(date);
        togglePicker();
      }
    },
    [onDateChange, togglePicker],
  );

  return (
    <DatePicker
      modal
      mode="date"
      open={open}
      date={selectedDate || new Date()}
      onConfirm={handleDateChange}
      onCancel={togglePicker}
      minimumDate={minimumDate}
      maximumDate={maximumDate}
    />
  );
}

export default NativeDatePicker;
