import React, {memo, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Modal from '../../../components/modal';
import TimesheetForm from '../component/timesheetForm';
import Typography from '../../../components/typography';
import {useEditTimesheet} from '../timesheet.hooks';

import {convertToMins, dateFormate} from '../../../utils/date';
import toast from '../../../utils/toast';

import {Timesheet} from '../interface';
import colors from '../../../constant/colors';
import fonts from '../../../constant/fonts';
import {ISO_DATE_FROMAT} from '../../../constant/date';

type Props = {
  isVisible: boolean;
  toggleModal: () => void;
  userId: string;
  formData?: Timesheet;
};

const EditTimesheetModal = ({
  toggleModal,
  formData,
  isVisible,
  userId,
}: Props) => {
  const [isShowToast, setIsToastShow] = useState<Boolean>(false);

  const {mutate, isLoading, isSuccess, message} = useEditTimesheet();

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
      setIsToastShow(v => !v);
    }
  }, [isSuccess, toggleModal]);

  const onEditSave = (data: Timesheet) => {
    mutate({
      time_sheets_attributes: {
        project_id: parseInt(data?.project + '', 10),
        date: dateFormate(data.date, ISO_DATE_FROMAT),
        duration: convertToMins(data.work_in_hours),
        description: data.description,
        id: data.timesheet_id,
      },
      user_id: userId,
    });
  };

  const onModalHide = () => {
    if (isShowToast) {
      toast(message!);
      setIsToastShow(v => !v);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      onModalHide={onModalHide}
      contentStyle={styles.main}>
      <View>
        <Typography type="title" style={styles.title}>
          Edit Timesheet
        </Typography>
        <TimesheetForm
          onSubmit={onEditSave}
          onCancel={toggleModal}
          defaultData={formData}
          userId={userId}
          isLoading={isLoading}
          isFormVisible
          isEditForm
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
});

export default memo(EditTimesheetModal);
