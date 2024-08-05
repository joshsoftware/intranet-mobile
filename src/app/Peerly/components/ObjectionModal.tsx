import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import Button from './button/button';

interface CenteredModalProps {
  visible: boolean;
  onClose?: () => void;
  setReason: (value: string) => void;
  onConfirm: () => void;
  reason: string;
  isDisabled: boolean;
}

const ObjectionModal: React.FC<CenteredModalProps> = ({
  visible,
  onClose,
  setReason,
  onConfirm,
  reason,
  isDisabled,
}) => {
  const handleReason = (value: string) => {
    setReason(value);
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>
              Please give the reason behind this objection?
            </Text>
            <Text style={styles.modalText}> HR team will contact you shortly.</Text>
            <TextInput
              style={styles.description}
              placeholder="Enter you text here"
              onChangeText={handleReason}
              value={reason}
              multiline
            />
              <View style={styles.buttonContainer}>
                <Button
                  title="Confirm"
                  type="primary"
                  onPress={onConfirm}
                  disabled={isDisabled}
                />
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    height: '50%',
    borderRadius: 12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: "5%",
    backgroundColor: '#F4F4F4',
  },
  modalText: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 16,
    textAlign:'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  description: {
    textAlignVertical: 'top',
    borderRadius: 12,
    borderWidth: 1,
    height: "40%",
    width: "90%",
    borderColor: 'transparent',
    marginBottom: 16,
    backgroundColor: 'white',
    padding:10,
  },
});

export default ObjectionModal;
