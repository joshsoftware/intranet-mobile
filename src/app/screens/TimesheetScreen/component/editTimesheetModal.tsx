import React, {memo, useEffect, useState} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Modal from '../../../components/modal';
import TimesheetForm from '../component/timesheetForm';
import Typography from '../../../components/typography';
import {useEditTimesheet} from '../timesheet.hooks';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';

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
  const [isShowToast, setIsShowToast] = useState<Boolean>(false);
  const {keyboardHeight} = useIsKeyboardShown();
  const insets = useSafeAreaInsets();

  const {mutate, isLoading, isSuccess, message} = useEditTimesheet();

  useEffect(() => {
    if (isSuccess) {
      toggleModal();
      setIsShowToast(v => !v);
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
      setIsShowToast(v => !v);
    }
  };

  const dynamicStyles = StyleSheet.create({
    scrollView: {
      paddingBottom: Platform.OS === 'ios' ? keyboardHeight - insets.bottom : 0,
    },
  });

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
      <KeyboardAwareScrollView
        style={[styles.scrollView, dynamicStyles.scrollView]}>
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
      </KeyboardAwareScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.WHITE,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 24,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
});

export default memo(EditTimesheetModal);
