import React from 'react';
import {
  Linking,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Button from '../../../components/button';
import Typography from '../../../components/typography';
import toast from '../../../utils/toast';
import {TalkItOut} from '../../../services/talkItOut/types';

import {Cross} from '../../../constant/icons';
import colors from '../../../constant/colors';

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  talkItOut: TalkItOut;
};

const openUrl = async (url: string) => {
  try {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  } catch {
    toast('Could not open link!', 'error');
  }
};

const TalkItOutModal = ({isVisible, closeModal, talkItOut}: Props) => {
  const handleHono = () => {
    closeModal();
    openUrl(talkItOut.hono_url);
  };

  const handleContinue = () => {
    closeModal();
    openUrl(talkItOut.google_form_url);
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isVisible}
      onRequestClose={closeModal}>
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.dialog}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeModal}
                hitSlop={12}>
                <Cross width={18} height={18} fill={colors.SECONDARY} />
              </TouchableOpacity>
              <Typography type="header" style={styles.title}>
                {talkItOut.title}
              </Typography>
              <Typography type="text" style={styles.message}>
                {talkItOut.modal_message}
              </Typography>
              <View style={styles.actions}>
                <Button
                  title="Go to HONO"
                  type="secondary"
                  onPress={handleHono}
                />
                <Button
                  title="Continue"
                  type="primary"
                  onPress={handleContinue}
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  dialog: {
    width: '100%',
    backgroundColor: colors.WHITE,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 12,
  },
  message: {
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
});

export default TalkItOutModal;
