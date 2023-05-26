import React, {useMemo, useState} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import Button from '../../../components/button';
import Modal from '../../../components/modal';
import PickerSelect from '../../../components/pickers/pickerSelect';
import Typography from '../../../components/typography';
import CheckBoxField from './CheckBoxField';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';
import {useProjectList, useUserList} from '../leave.hooks';

import strings from '../../../constant/strings';
import {ILeaveFilters} from '../interface';

interface Props {
  isManagement: boolean;
  isVisible: boolean;
  closeModal: () => void;
  filters: ILeaveFilters;
  setFilter: (filters: ILeaveFilters) => void;
}

interface IFormValues {
  projectId?: number;
  userId?: number;
  userType: boolean;
  leave: boolean;
  wfh: boolean;
  optionalHoliday: boolean;
  spl: boolean;
  unpaid: boolean;
}

function FilterModal({
  isManagement,
  isVisible,
  closeModal,
  filters,
  setFilter,
}: Props) {
  const keyboardIsVisible = useIsKeyboardShown();

  const [isSelectAll, setIsSelectAll] = useState(false);

  const defaultFormValues = useMemo((): IFormValues => {
    const leaveType = new Set(
      filters.leave_type.split(',').filter(e => e !== '') || [],
    );

    return {
      projectId: filters.project_id,
      userId: filters.user_id,
      userType: filters.active_or_all_flags === 'all',
      leave: leaveType.has('LEAVE'),
      wfh: leaveType.has('WFH'),
      optionalHoliday: leaveType.has('OPTIONAL HOLIDAY'),
      spl: leaveType.has('SPL'),
      unpaid: leaveType.has('UNPAID'),
    };
  }, [filters]);

  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultFormValues,
  });

  const projects = useProjectList();
  const users = useUserList();

  const toggleIsSelectAll = () => {
    if (isSelectAll) {
      setValue('leave', false);
      setValue('wfh', false);
      setValue('optionalHoliday', false);
      setValue('spl', false);
      setValue('unpaid', false);
    } else {
      setValue('leave', true);
      setValue('wfh', true);
      setValue('optionalHoliday', true);
      setValue('spl', true);
      setValue('unpaid', true);
    }

    setIsSelectAll(!isSelectAll);
  };

  const onSave = (formValues: IFormValues) => {
    const {
      projectId,
      userId,
      userType,
      leave,
      wfh,
      spl,
      unpaid,
      optionalHoliday,
    } = formValues;

    const leaveType: string[] = [];

    if (leave) {
      leaveType.push('LEAVE');
    }

    if (wfh) {
      leaveType.push('WFH');
    }

    if (spl) {
      leaveType.push('SPL');
    }

    if (optionalHoliday) {
      leaveType.push('OPTIONAL HOLIDAY');
    }

    if (unpaid) {
      leaveType.push('UNPAID');
    }

    setFilter({
      project_id: projectId,
      user_id: userId,
      active_or_all_flags: userType ? 'all' : 'active',
      from: filters.from,
      to: filters.to,
      page_no: filters.page_no,
      leave_type: leaveType.join(','),
      pending_flag: filters.pending_flag,
    });

    closeModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      contentStyle={styles.contentStyle}>
      <View style={styles.container}>
        {isManagement && (
          <>
            <View style={styles.row}>
              <Typography type="header" style={styles.header}>
                Filter
              </Typography>
              <Typography type="title" style={styles.clearAll}>
                Clear All
              </Typography>
            </View>

            <View style={styles.fieldStyle}>
              <Typography type="text" style={styles.labelText}>
                Select Project
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <PickerSelect
                    placeholder={{
                      label: strings.SELECT,
                      value: null,
                    }}
                    error={errors.projectId?.message}
                    onValueChange={onChange}
                    value={value ? value : strings.SELECT}
                    items={projects}
                  />
                )}
                name="projectId"
              />
            </View>

            <View style={styles.fieldStyle}>
              <Typography type="text" style={styles.labelText}>
                Select User
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <PickerSelect
                    placeholder={{
                      label: strings.SELECT,
                      value: null,
                    }}
                    error={errors.userId?.message}
                    onValueChange={onChange}
                    value={value ? value : strings.SELECT}
                    items={users}
                  />
                )}
                name="userId"
              />
            </View>

            <View style={styles.row}>
              <Typography type="text">Show Active User</Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Switch value={value} onValueChange={onChange} />
                )}
                name="userType"
              />
              <Typography type="text">Show All User</Typography>
            </View>
          </>
        )}

        <View style={styles.row}>
          <Typography type="header" style={styles.header}>
            Leave Type
          </Typography>
          <CheckBoxField
            label="Select All"
            checked={isSelectAll}
            onPress={toggleIsSelectAll}
          />
        </View>

        <View style={styles.leaveTypeContainer}>
          <View style={styles.leaveTypeColumn}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CheckBoxField
                  label="Leave"
                  checked={value}
                  onPress={onChange}
                />
              )}
              name="leave"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CheckBoxField
                  label="Work From Home"
                  checked={value}
                  onPress={onChange}
                />
              )}
              name="wfh"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CheckBoxField
                  label="Optional Holiday"
                  checked={value}
                  onPress={onChange}
                />
              )}
              name="optionalHoliday"
            />
          </View>
          <View style={styles.leaveTypeColumn}>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CheckBoxField
                  label="Special Leave"
                  checked={value}
                  onPress={onChange}
                />
              )}
              name="spl"
            />
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <CheckBoxField
                  label="Unpaid Leave"
                  checked={value}
                  onPress={onChange}
                />
              )}
              name="unpaid"
            />
          </View>
        </View>

        {!keyboardIsVisible && (
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={closeModal} type="secondary" />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Apply"
                onPress={handleSubmit(onSave)}
                type="primary"
              />
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contentStyle: {
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  clearAll: {
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  fieldStyle: {
    marginBottom: 15,
  },
  labelText: {
    marginBottom: 15,
  },
  leaveTypeContainer: {
    flexDirection: 'row',
  },
  leaveTypeColumn: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default FilterModal;
