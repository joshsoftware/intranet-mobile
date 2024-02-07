import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View, Text} from 'react-native';
import * as yup from 'yup';

import BottomModal from '../../../components/BottomModal';
import Button from '../../../components/button';
import Input from '../../../components/input';

import colors from '../../../constant/colors';

const rejectFormSchema = yup.object().shape({
  rejectReason: yup
    .string()
    .required('Reject reason cannot be empty!')
    .min(3, 'Reject reason should be at least 3 characters long'),
});

interface IProps {
  onApprove: () => void;
  onReject: (reason: string) => void;
  onCancel: () => void;
}

const ManagerActionBar = (props: IProps) => {
  const {onApprove, onReject, onCancel} = props;

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm({
    resolver: yupResolver(rejectFormSchema),
    defaultValues: {
      rejectReason: '',
    },
  });

  const handleApprove = () => {
    setShowApproveModal(false);
    onApprove();
  };

  const handleReject = async (data: {rejectReason: string}) => {
    const {rejectReason} = data;

    setShowRejectModal(false);
    onReject(rejectReason);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          type="primary"
          title="Reject"
          onPress={() => setShowRejectModal(true)}
        />
        <Button
          type="primary"
          title="Approve"
          onPress={() => setShowApproveModal(true)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button type="secondary" title="Cancel" onPress={onCancel} />
      </View>

      <BottomModal
        isVisible={showApproveModal}
        closeModal={() => setShowApproveModal(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Confirm Timesheet Approval</Text>
          <View style={styles.buttonContainer}>
            <Button
              type="secondary"
              title="Cancel"
              onPress={() => setShowApproveModal(false)}
            />
            <Button type="primary" title="Approve" onPress={handleApprove} />
          </View>
        </View>
      </BottomModal>

      <BottomModal
        isVisible={showRejectModal}
        closeModal={() => setShowRejectModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.rejectReasonContainer}>
            <Text style={styles.title}>Confirm Timesheet Rejection</Text>

            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Reject Reason"
                  value={value}
                  onChangeText={onChange}
                  error={errors?.rejectReason?.message}
                />
              )}
              name="rejectReason"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              type="secondary"
              title="Cancel"
              onPress={() => setShowRejectModal(false)}
            />
            <Button
              type="primary"
              title="Reject"
              onPress={handleSubmit(handleReject)}
            />
          </View>
        </View>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 16,
    gap: 16,
  },
  modalContainer: {
    paddingBottom: 10,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.SECONDARY,
    marginBottom: 16,
  },
  rejectReasonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  label: {
    color: colors.SECONDARY,
  },
});

export default ManagerActionBar;
