import React, {useMemo, useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Button from './button/button';
import colors from '../constants/colors';
import message from '../constants/message';

interface CenteredModalProps {
  visible: boolean;
  onClose?: () => void;
  setReason: (value: string) => void;
  onConfirm: () => void;
  reason: string;
  isLoading: boolean;
}
const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const ObjectionModal: React.FC<CenteredModalProps> = ({
  visible,
  onClose,
  setReason,
  onConfirm,
  reason,
  isLoading,
}) => {
  const [selectedReason, setSelectedReason] = useState(reason);
  const handleReasonChange = (item: { value: string }) => {
    setSelectedReason(item.value);
    setReason(item.value);
  };

  const isReasonEmpty = useMemo(() => {
    if (!reason.trim().length) {
      return true;
    } else {
      return false;
    }
  }, [reason]);

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
              <Text style={styles.modalText}>
                HR team will contact you shortly.
              </Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                containerStyle={styles.containerStyle}
                data={message.REASON_OPTIONS}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select a reason"
                value={selectedReason}
                onChange={handleReasonChange}
              />
              <View style={styles.buttonContainer}>
                <Button
                  title="Confirm"
                  type="primary"
                  onPress={onConfirm}
                  isLoading={isLoading}
                  disabled={isReasonEmpty}
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
    padding: '5%',
    backgroundColor: '#F4F4F4',
  },
  modalText: {
    fontWeight: '500',
    color: '#000000',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 40,
  },
  dropdown: {
    height: 50,
    width:200,
    borderColor: colors.MEDIUM_GRAY,
    borderRadius: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  containerStyle: {
    borderRadius: 10,
    paddingBottom: 0,
    paddingVertical: 0,
    marginVertical: 0,
    maxHeight: SCREEN_HEIGHT / 4.5,
    width:'50%',
  },
});

export default ObjectionModal;
