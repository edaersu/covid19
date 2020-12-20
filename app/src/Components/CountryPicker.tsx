import { Picker } from '@react-native-picker/picker';
import React, { ReactText, useEffect, useState } from 'react';
import PickerComponent, { PickerComponentProps } from './PickerComponent';

export type CommonPickerProps = {
  value?: ReactText;
  onChange: (p1?: ReactText) => any;
  options?: {
    value: ReactText;
    label: string;
  }[];
};

const CountryPicker: React.FC<
  Omit<PickerComponentProps, 'onChange' | 'children'> & CommonPickerProps
> = ({ visible, onChange, onClose, value, options }) => {
  const [curValue, setCurValue] = useState<ReactText | undefined>(value);
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
    <PickerComponent
      loading={!options}
      visible={visible}
      onClose={handleOnClose}
      onChange={handleOnChange}
    >
      <Picker
        selectedValue={curValue}
        style={{ width: '100%', paddingBottom: 12 }}
        onValueChange={val => setCurValue(val)}
      >
        {options?.map(opt => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
    </PickerComponent>
  );
};

export default CountryPicker;
