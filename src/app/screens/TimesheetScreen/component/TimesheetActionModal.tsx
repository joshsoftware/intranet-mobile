import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../../../components/button';
import Typography from '../../../components/typography';
import Input from '../../../components/input';
import BottomModal from '../../../components/BottomModal';

import colors from '../../../constant/colors';

export type TModalState = 'approve' | 'reject' | null;

interface IProps {
  modalState: TModalState;
  closeModal: () => void;
}

function TimesheetActionModal(props: IProps) {
  const {modalState} = props;

  const [noteText, setNoteText] = useState('');
  const [showError, setShowError] = useState(false);

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

  return (
    <BottomModal isVisible={modalState !== null} closeModal={closeModal}>
      <View style={styles.container}>
        {modalState === 'approve' && (
          <>
            <Typography style={styles.title}>
              Please confirm Timesheet Approval
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
            <View>
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
      </View>
    </BottomModal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 15,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  title: {
    alignSelf: 'center',
    color: colors.SECONDARY,
    fontWeight: 'bold',
  },
});

export default TimesheetActionModal;
