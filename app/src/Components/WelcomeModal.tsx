import React from 'react';
import { Button, Modal, Text, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../Globals/colors';

const WelcomeModal: React.FC<{
  visible: boolean;
  onClose: () => any;
}> = ({ onClose, visible }) => {
  return (
    <Modal transparent onRequestClose={onClose} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={onClose}>
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
              Lorem ipsum dolar sit amet!
            </Text>
            <Button onPress={onClose} title="Devam et" color={colors.yellow} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default WelcomeModal;
