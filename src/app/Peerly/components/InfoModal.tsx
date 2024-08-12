import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Button from './button/button';

interface InfoModalProps {
  visible: boolean;
  closeModal: () => void;
  message: string;
}
const InfoModal: React.FC<InfoModalProps> = ({
  visible,
  closeModal,
  message,
}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.text}>{message}</Text>
              <Button title="Close" type="tertiary" onPress={closeModal} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 5,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default InfoModal;
