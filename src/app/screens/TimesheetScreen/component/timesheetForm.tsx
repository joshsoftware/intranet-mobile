import React, {memo, useEffect, useMemo} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import DatePicker from '../../../components/pickers/datePicker';
import Button from '../../../components/button';
import {useAssignedProjects, useTimesheetWarning} from '../timesheet.hooks';

import {todaysDate} from '../../../utils/date';
import {dateFormater} from '../../../utils/dateFormater';
import {Timesheet} from '../interface';

import colors from '../../../constant/colors';
import strings from '../../../constant/strings';
import {workHoursData} from '../../../constant/timesheet';

const timesheetFormSchema = yup.object().shape({
  project_id: yup.string().required('Project is a required field'),
  date: yup.mixed().required('Date is a required field'),
  worked_minutes: yup.number().required('Work hours is a required field'),
  description: yup
    .string()
    .required('Description is a required field')
    .min(3, 'Description must be at least 3 characters long'),
});

type Props = {
  defaultData?: Timesheet;
  defaultDate?: string;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
  isEditForm?: boolean;
  isFormVisible?: boolean;
  isLoading?: boolean;
  userId: string;
  toggleForm?: Function;
};

const TimesheetForm = ({
  defaultData,
  defaultDate,
  onSubmit,
  onCancel,
  isEditForm = false,
  isFormVisible = true,
  isLoading,
  userId,
  toggleForm,
}: Props) => {
  const initialValues = useMemo(() => {
    return defaultData ?? {
      project_id: undefined,
      date: defaultDate ?? undefined,
      worked_minutes: undefined,
      description: undefined,
    };
  }, [defaultData, defaultDate]);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: {errors, isSubmitted, isSubmitSuccessful},
  } = useForm({
    mode: 'onSubmit',
    values: initialValues,
    resolver: yupResolver(timesheetFormSchema as any),
  });

  const watchFields = watch(['project_id', 'worked_minutes']);

  const {data: projects} = useAssignedProjects(userId);
  const {warningMessage, resetWarning} = useTimesheetWarning(
    userId,
    watchFields,
  );

  useEffect(() => {
    if (isSubmitted && isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitted, isSubmitSuccessful, reset]);

  const addTimesheet = useMemo(
    () =>
      handleSubmit((data: any) => {
        resetWarning();

        let project = projects?.find(value => {
          return data.project_id === value.value;
        });

        onSubmit({
          ...data,
          project: project?.label,
          project_id: data.project_id,
        });
      }),
    [handleSubmit, onSubmit, projects],
  );

  const handleAddTimesheet = (...args: any[]) => {
    if (isFormVisible) {
      addTimesheet(...args);
    } else {
      toggleForm?.();
    }
  };

  const updateTimesheet = handleSubmit(data => onSubmit(data));

  return (
    <>
      {isFormVisible && (
        <>
          <View>
            <Typography type="header" style={styles.labelText}>
              Project
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <PickerSelect
                  onValueChange={onChange}
                  value={value}
                  items={projects}
                  error={errors?.project_id?.message}
                />
              )}
              name="project_id"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.rowItem}>
              <Typography type="header" style={styles.labelText}>
                Select Date
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <DatePicker
                    onDateChange={onChange}
                    hideIcon={false}
                    selectedDate={value ? new Date(value) : undefined}
                    placeholder="Select date"
                    maximumDate={todaysDate()}
                    error={errors?.date?.message}
                  />
                )}
                name="date"
              />
            </View>

            <View style={styles.rowItem}>
              <Typography type="header" style={styles.labelText}>
                Work in hours
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <PickerSelect
                    onValueChange={onChange}
                    value={value}
                    items={workHoursData}
                    error={errors?.worked_minutes?.message}
                  />
                )}
                name="worked_minutes"
              />
            </View>
          </View>

          <View>
            <Typography type="header" style={styles.labelText}>
              Description
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <View
                  style={[
                    styles.descriptionContainer,
                    errors?.description ? styles.errorBorder : {},
                  ]}>
                  <TextInput
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value ? value : ''}
                    multiline={true}
                    placeholder={strings.DESCRIPTION_PLACEHOLDER}
                    placeholderTextColor={colors.PLACEHOLDER_TEXT}
                    style={styles.description}
                  />
                </View>
              )}
              name="description"
            />
            {errors?.description?.message && (
              <Typography style={styles.error} type="description">
                {errors.description.message}
              </Typography>
            )}
          </View>

          {warningMessage && (
            <Text style={styles.warningStyle}>{warningMessage}</Text>
          )}
        </>
      )}
      {!isEditForm ? (
        <View style={styles.addButton}>
          <Button
            type="tertiary"
            title="Add Timesheet"
            onPress={handleAddTimesheet}
          />
        </View>
      ) : (
        <View style={styles.btns}>
          <Button title="Cancel" type="secondary" onPress={onCancel} />
          <Button
            title="Update"
            type="primary"
            isLoading={isLoading}
            onPress={updateTimesheet}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    textAlign: 'left',
    marginVertical: 5,
  },
  descriptionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.TEXT_INPUT_BORDER,
    height: 100,
  },
  description: {
    color: colors.SECONDARY,
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 6,
    flex: 1,
    textAlignVertical: 'top',
  },
  errorBorder: {
    borderBottomColor: colors.ERROR_RED,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowItem: {
    marginVertical: 10,
    width: '48%',
  },
  item: {
    height: 40,
    width: '100%',
    justifyContent: 'space-around',
  },
  date: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateText: {
    marginHorizontal: 15,
  },
  error: {
    color: colors.ERROR_RED,
    marginTop: 5,
  },
  addButton: {
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    justifyContent: 'space-around',
    paddingVertical: 20,
    gap: 10,
  },
  btnText: {
    color: colors.PRIMARY,
  },
  cancel: {
    backgroundColor: colors.WHITE,
    borderWidth: 2,
    width: '45%',
  },
  save: {
    width: '45%',
  },
  warningStyle: {
    textAlign: 'center',
    color: colors.PRIMARY,
  },
});

export default memo(TimesheetForm);
