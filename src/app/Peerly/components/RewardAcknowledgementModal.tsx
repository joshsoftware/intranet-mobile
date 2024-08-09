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
            <View style={styles.btnMargin}>
              <Button title="Reset" type="secondary" onPress={resetModal} />
            </View>
            <Button
              title="Confirm"
              type="primary"
              isLoading={isLoading}
              onPress={handleConfirm}
            />
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
    padding: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  btnMargin: {
    marginRight: 20,
  },
  btnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});

export default RewardAcknowledgementModal;
