import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import Button from './button/button';

interface RewardAcknowledgementModalProps {
  visible: boolean;
  isLoading: boolean;
  rewardLabel: string;
  resetModal: () => void;
  handleConfirm: () => void;
}
const RewardAcknowledgementModal: React.FC<RewardAcknowledgementModalProps> = ({
  visible,
  isLoading,
  rewardLabel,
  resetModal,
  handleConfirm,
}) => {
  return (
    <Modal transparent={true} visible={visible} onRequestClose={resetModal}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.text}>You have given {rewardLabel} reward.</Text>
          <View style={styles.btnWrapper}>
            <View style={styles.btnSecondary}>
              <Button title="reset" type="secondary" onPress={resetModal} />
            </View>
            <View>
              <Button
                title="Confirm"
                type="primary"
                isLoading={isLoading}
                onPress={handleConfirm}
              />
            </View>
          </View>
        </View>
      </View>
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
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 15,
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnSecondary: {
    width: '30%',
    marginRight: 5,
  },
});

export default RewardAcknowledgementModal;
