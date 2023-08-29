import React, {useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Button from '../../../components/button';
import Modal from '../../../components/modal';
import Typography from '../../../components/typography';
import Input from '../../../components/input';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

export type TModalState = 'approve' | 'reject' | null;

interface IProps {
  modalState: TModalState;
  closeModal: () => void;
}

function TimesheetActionModal(props: IProps) {
  const {modalState} = props;

  const [noteText, setNoteText] = useState('');
  const [showError, setShowError] = useState(false);
  const {keyboardHeight} = useIsKeyboardShown();
  const insets = useSafeAreaInsets();

  const handleNoteTextChange = (txt: string) => {
    if (txt.trim().length !== 0) {
      setShowError(false);
    }

    setNoteText(txt);
  };

  const handleApproveClick = () => {
    // TODO: Send approve request
  };

  const handleRejectClick = () => {
    const trimedNoteText = noteText.trim();
    if (trimedNoteText.length === 0) {
      setShowError(true);
    } else {
      // TODO: Send rejection request
    }
  };

  const closeModal = () => {
    setShowError(false);
    setNoteText('');
    props.closeModal();
  };

  const dynamicStyles = StyleSheet.create({
    scrollView: {
      marginBottom: Platform.OS === 'ios' ? keyboardHeight - insets.bottom : 0,
    },
  });

  return (
    <Modal
      isVisible={modalState !== null}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      contentStyle={styles.contentStyle}>
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.containerStyle,
          dynamicStyles.scrollView,
        ]}>
        {modalState === 'approve' && (
          <>
            <Typography style={styles.title}>
              Please Confirm Timesheet Approval
            </Typography>
            <View style={styles.row}>
              <Button title="Cancel" type="secondary" onPress={closeModal} />
              <Button
                title="Approve"
                type="success"
                onPress={handleApproveClick}
              />
            </View>
          </>
        )}

        {modalState === 'reject' && (
          <>
            <View style={styles.card}>
              <Input
                placeholder="Rejection Note"
                value={noteText}
                onChangeText={handleNoteTextChange}
                error={showError ? 'Rejection note is required' : ''}
              />
            </View>

            <View style={styles.row}>
              <Button title="Cancel" type="secondary" onPress={closeModal} />
              <Button
                title="Reject"
                type="danger"
                onPress={handleRejectClick}
              />
            </View>
          </>
        )}
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 24,
  },
  containerStyle: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 16,
  },
  successText: {
    color: colors.SUCCESS,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  card: {
    padding: 10,
  },
  rejectButtonContainer: {
    marginTop: 10,
  },
});

export default TimesheetActionModal;
