import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';

import Button from '../../../components/button';
import Modal from '../../../components/modal';
import PickerSelect from '../../../components/pickers/pickerSelect';
import Typography from '../../../components/typography';
import CheckBoxField from './CheckBoxField';
import Touchable from '../../../components/touchable';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';
import {useProjectList, useUserList} from '../leave.hooks';
import UserTypeButton from './UserTypeButton';

import {endOfMonth, startOfMonth} from '../../../utils/date';

import strings from '../../../constant/strings';
import colors from '../../../constant/colors';
import {
  LEAVE,
  OPTIONAL_HOLIDAY,
  SPL,
  UNPAID,
  WFH,
} from '../../../constant/leaveType';
import {ILeaveFilters} from '../interface';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  filters: ILeaveFilters;
  changeFilters: (filters: Partial<ILeaveFilters>) => void;
  resetDateRange: () => void;
}

interface IFormValues {
  projectId: number | null;
  userId: number | null;
  userType: 'active' | 'all';
  leave: boolean;
  wfh: boolean;
  optionalHoliday: boolean;
  spl: boolean;
  unpaid: boolean;
}

function FilterModal({
  isVisible,
  closeModal,
  filters,
  changeFilters,
  resetDateRange,
}: Props) {
  const {isKeyboardShown} = useIsKeyboardShown();

  const [isSelectAll, setIsSelectAll] = useState(false);

  const defaultFormValues = useMemo(() => {
    const leaveType = new Set(
      filters.leave_type.split(',').filter(e => e !== '') || [],
    );

    return {
      projectId: filters.project_id,
      userId: filters.user_id,
      userType: filters.active_or_all_flags,
      leave: leaveType.has(LEAVE),
      wfh: leaveType.has(WFH),
      optionalHoliday: leaveType.has(OPTIONAL_HOLIDAY),
      spl: leaveType.has(SPL),
      unpaid: leaveType.has(UNPAID),
    };
  }, [filters]);

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultFormValues,
  });

  const {
    data: projects,
    refetch: refetchProjects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useProjectList();

  const {
    data: users,
    refetch: refetchUsers,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUserList();

  const toggleIsSelectAll = useCallback(() => {
    setIsSelectAll(value => {
      setValue('leave', !value);
      setValue('wfh', !value);
      setValue('optionalHoliday', !value);
      setValue('spl', !value);
      setValue('unpaid', !value);

      return !value;
    });
  }, [setValue]);

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
      leaveType.push(LEAVE);
    }
    if (wfh) {
      leaveType.push(WFH);
    }
    if (spl) {
      leaveType.push(SPL);
    }
    if (optionalHoliday) {
      leaveType.push(OPTIONAL_HOLIDAY);
    }
    if (unpaid) {
      leaveType.push(UNPAID);
    }

    changeFilters({
      project_id: projectId,
      user_id: userId,
      active_or_all_flags: userType,
      leave_type: leaveType.join(','),
    });

    closeModal();
  };

  const handleClearAll = () => {
    reset({
      projectId: null,
      userId: null,
      userType: 'active',
      leave: false,
      wfh: false,
      optionalHoliday: false,
      spl: false,
      unpaid: false,
    });

    changeFilters({
      project_id: null,
      user_id: null,
      active_or_all_flags: 'active',
      from: startOfMonth,
      leave_type: '',
      pending_flag: filters.pending_flag,
      to: endOfMonth,
    });

    resetDateRange();

    setIsSelectAll(false);
  };

  const onLeaveTypeChange = (
    handleChange: (...event: any[]) => void,
    ...event: any[]
  ) => {
    setIsSelectAll(false);
    handleChange(...event);
  };

  const renderContent = () => {
    if (isUsersLoading || isProjectsLoading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.PRIMARY} />
        </View>
      );
    }

    if (isUsersError || isProjectsError) {
      return (
        <View style={styles.centerContainer}>
          <Typography type="error">
            Could not get projects and users information
          </Typography>
          <View style={styles.row}>
            <View style={styles.buttonContainer}>
              <Button title="Cancel" onPress={closeModal} type="secondary" />
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title="Retry"
                onPress={() => {
                  refetchProjects();
                  refetchUsers();
                }}
                type="primary"
              />
            </View>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Typography type="header" style={styles.header}>
            Filter
          </Typography>
          <Touchable type="opacity" onPress={handleClearAll}>
            <Typography type="title" style={styles.clearAll}>
              Clear Filters
            </Typography>
          </Touchable>
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
          <Controller
            control={control}
            name="userType"
            render={({field: {onChange, value}}) => (
              <UserTypeButton value={value} onChange={onChange} />
            )}
          />
        </View>

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
                  onPress={(...event: any[]) =>
                    onLeaveTypeChange(onChange, ...event)
                  }
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
                  onPress={(...event: any[]) =>
                    onLeaveTypeChange(onChange, ...event)
                  }
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
                  onPress={(...event: any[]) =>
                    onLeaveTypeChange(onChange, ...event)
                  }
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
                  onPress={(...event: any[]) =>
                    onLeaveTypeChange(onChange, ...event)
                  }
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
                  onPress={(...event: any[]) =>
                    onLeaveTypeChange(onChange, ...event)
                  }
                />
              )}
              name="unpaid"
            />
          </View>
        </View>
        {!isKeyboardShown && (
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
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      animationInTiming={500}
      animationOutTiming={500}
      contentStyle={styles.contentStyle}>
      {renderContent()}
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
    ...Platform.select({
      ios: {gap: 15},
      android: {},
    }),
  },
  centerContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilterModal;
