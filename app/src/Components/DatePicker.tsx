import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import PickerComponent, { PickerComponentProps } from './PickerComponent';

export type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
};

const DatePicker: React.FC<
  Omit<PickerComponentProps, 'onChange' | 'children'> & DatePickerProps
> = ({ visible, onChange, onClose, value, ...props }) => {
  const [curValue, setCurValue] = useState<Date>(value);
  const handleOnChange = () => {
    onChange(curValue);
    onClose();
  };

  const handleOnClose = () => {
    onClose(value);
  };

  useEffect(() => {
    setCurValue(value);
  }, [value]);

  return (
    <PickerComponent visible={visible} onClose={handleOnClose} onChange={handleOnChange}>
      <DateTimePicker
        testID="dateTimePicker"
        mode="date"
        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
        onChange={(_: any, date) => setCurValue(date!)}
        value={curValue}
        {...props}
      />
    </PickerComponent>
  );
};

export default DatePicker;
