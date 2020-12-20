import React from 'react';
import { ActivityIndicator, Button, Modal, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../Globals/colors';

export type PickerComponentProps = {
  visible: boolean;
  onChange: () => any;
  onClose: (p1?: any) => any;
  children: JSX.Element;
  loading?: boolean;
};

function PickerComponent({ loading, onClose, visible, onChange, ...props }: PickerComponentProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="slide"
      onDismiss={onClose}
    >
      <TouchableWithoutFeedback onPressOut={onClose}>
        <View style={{ flex: 1 }} />
      </TouchableWithoutFeedback>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.secondary,
        }}
      >
        <View
          style={{
            backgroundColor: colors.darkGray,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Button onPress={onClose} title="Vazgeç" color={colors.textColorWhite} />
          <Button onPress={onChange} title="Bitti" color={colors.yellow} />
        </View>
        {loading ? (
          <View
            style={{
              height: 200,
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          props.children
        )}
      </View>
    </Modal>
  );
}

export default PickerComponent;
