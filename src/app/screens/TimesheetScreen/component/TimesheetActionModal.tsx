import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Button from '../../../components/button';
import DetailRow from '../../../components/DetailRow';
import Modal from '../../../components/modal';
import Typography from '../../../components/typography';
import Input from '../../../components/input';

import {getParams} from '../../../navigation';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import {Timesheet} from '../interface';

interface IProps {
  timesheetData: Timesheet | null;
  closeModal: () => void;
}

function TimesheetActionModal(props: IProps) {
  const params: any = getParams();
  const {closeModal, timesheetData} = props;

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

  return (
    <Modal
      isVisible={timesheetData !== null}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      // onModalHide={onModalHide}
      contentStyle={styles.contentStyle}>
      <KeyboardAwareScrollView contentContainerStyle={styles.containerStyle}>
        <Typography style={styles.title}>Timesheet</Typography>
        {params.name && <DetailRow label="Employee" value={params.name} />}
        <DetailRow label="Date" value={timesheetData?.date} />
        <DetailRow label="Work Hours" value={timesheetData?.work_in_hours} />

        <Typography type="label" style={styles.descriptionTitle}>
          Description
        </Typography>
        <Typography type="text">{timesheetData?.description}</Typography>

        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <Button
              title="Approve"
              type="success"
              onPress={handleApproveClick}
            />
          </View>
          <View style={styles.rejectCard}>
            <Input
              placeholder="Rejection Note"
              value={noteText}
              onChangeText={handleNoteTextChange}
              error={showError ? 'Rejection note is required' : ''}
            />
            <View style={(styles.row, styles.rejectButtonContainer)}>
              <Button
                title="Reject"
                type="danger"
                onPress={handleRejectClick}
              />
            </View>
          </View>

          <View style={styles.row}>
            <Button title="Cancel" type="secondary" onPress={closeModal} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: '20%',
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingTop: 24,
  },
  containerStyle: {
    paddingHorizontal: 16,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 16,
  },
  descriptionTitle: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  rejectCard: {
    borderWidth: 2,
    borderColor: colors.LIGHT_RED_BACKGROUND,
    padding: 10,
    borderRadius: 22,
  },
  buttonContainer: {
    paddingVertical: 16,
    gap: 16,
  },
  rejectButtonContainer: {
    marginTop: 10,
  },
});

export default TimesheetActionModal;
