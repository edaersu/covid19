import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import { useCountries } from '../utils/data';
import PickerComponent, { PickerComponentProps } from './PickerComponent';

export type CountryPickerProps = {
  value: string;
  onChange: (p1: string) => any;
  hideCancel?: boolean;
};

const CountryPicker: React.FC<
  Omit<PickerComponentProps, 'onChange' | 'children'> & CountryPickerProps
> = ({ visible, onChange, onClose, value, hideCancel }) => {
  const { items: countries, isValidating } = useCountries();
  const countryOptions = countries?.map(c => ({
    label: c,
    value: c,
  }));
  const [curValue, setCurValue] = useState<string>(value);
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
      loading={isValidating}
      visible={visible}
      onClose={handleOnClose}
      onChange={handleOnChange}
      hideCancel={hideCancel}
    >
      <Picker
        selectedValue={curValue}
        style={{ width: '100%', paddingBottom: 12 }}
        onValueChange={val => setCurValue(String(val))}
      >
        {countryOptions?.map(opt => (
          <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
        ))}
      </Picker>
    </PickerComponent>
  );
};

export default CountryPicker;
