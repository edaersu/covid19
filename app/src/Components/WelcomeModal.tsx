import React, { useEffect, useState } from 'react';
import { Modal, Text, View } from 'react-native';
import colors from '../Globals/colors';
import { storeDataToStorage } from '../utils';
import CountryPicker from './CountryPicker';

const WelcomeModal: React.FC<{
  onChange: (p1: string) => any;
  visible: boolean;
}> = ({ onChange, visible }) => {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    if (value) {
      onChange(value);
      storeDataToStorage('country', value);
    }
  }, [value]);

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0, 0.6)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={[
            {
              padding: 24,
              borderRadius: 6,
              backgroundColor: colors.primary,
              borderWidth: 0.5,
              borderColor: colors.yellow,
              alignItems: 'center',
            },
          ]}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: '500',
              color: colors.textColorWhite,
            }}
          >
            Hoşgeldin!
          </Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 16,
              color: colors.textColorWhite,
            }}
          >
            Lütfen bulunduğun ülkeyi seç
          </Text>
        </View>
      </View>
      <CountryPicker value="Turkey" visible hideCancel onClose={() => {}} onChange={setValue} />
    </Modal>
  );
};

export default WelcomeModal;
