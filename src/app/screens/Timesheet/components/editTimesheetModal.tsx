import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from '../../../components/modal';
import TimesheetForm from '../components/timesheetForm';
import Typography from '../../../components/typography';

import {TimesheetFormData} from '../interfaces';

import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';

type Props = {
  isVisible: boolean;
  formData?: TimesheetFormData;
  toggleModal: () => void;
  onSave: () => void;
};

const EditTimesheetModal = ({
  toggleModal,
  onSave,
  formData,
  isVisible,
}: Props) => (
  <Modal
    isVisible={isVisible}
    animationIn={'slideInUp'}
    animationOut={'slideOutDown'}
    animationInTiming={500}
    animationOutTiming={500}
    contentStyle={styles.modal}>
    <View style={styles.main}>
      <View>
        <Typography type="title" style={styles.title}>
          Edit Timesheet
        </Typography>

        <TimesheetForm
          onSubmit={onSave}
          onCancel={toggleModal}
          isFormVisible={true}
          defaultData={formData}
          isAddButtonVisible={false}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-start',
    height: 0,
  },
  main: {
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
    height: '100%',
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
});

export default memo(EditTimesheetModal);
