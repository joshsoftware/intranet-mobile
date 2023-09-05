import React, {memo, useEffect, useMemo, useRef} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import Collapsible from 'react-native-collapsible';

import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import DatePicker from '../../../components/pickers/datePicker';
import Input from '../../../components/input';
import Button from '../../../components/button';
import {useAssignedProjects} from '../timesheet.hooks';

import {todaysDate} from '../../../utils/date';
import {dateFormater} from '../../../utils/dateFormater';
import {Timesheet} from '../interface';

import colors from '../../../constant/colors';
import strings from '../../../constant/strings';
import {workHoursData} from '../../../constant/timesheet';

const timesheetFormSchema = yup.object().shape({
  project: yup.string().required('Project is a required field'),
  date: yup.date().required('Date is a required field'),
  work_in_hours: yup.string().required('Work hours is a required field'),
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
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors, isSubmitted, isSubmitSuccessful},
  } = useForm({
    mode: 'onSubmit',
    values: defaultData ?? {
      project: undefined,
      date: defaultDate ?? undefined,
      work_in_hours: undefined,
      description: undefined,
    },
    resolver: yupResolver(timesheetFormSchema),
  });

  const {data: projects} = useAssignedProjects(userId);

  // Workaround for issue: https://github.com/facebook/react-native/issues/36494
  const iOSTextInputWorkaroundRef = useRef(false);

  useEffect(() => {
    if (isSubmitted && isSubmitSuccessful) {
      reset();

      // Workaround for issue: https://github.com/facebook/react-native/issues/36494
      iOSTextInputWorkaroundRef.current = Platform.OS === 'ios';
    }
  }, [isSubmitted, isSubmitSuccessful, reset]);

  const addTimesheet = useMemo(
    () =>
      handleSubmit((data: any) => {
        let project = projects?.find(value => {
          return data.project === value.value;
        });
        onSubmit({
          ...data,
          timesheet_id: data.project + dateFormater(data.date),
          project: project?.label,
          project_id: data.project,
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
      <Collapsible collapsed={!isFormVisible} duration={400}>
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
                error={errors?.project?.message}
              />
            )}
            name="project"
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
                  maximumDate={todaysDate}
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
                  error={errors?.work_in_hours?.message}
                />
              )}
              name="work_in_hours"
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
              <Input
                onBlur={onBlur}
                onChangeText={txt => {
                  // Workaround for issue: https://github.com/facebook/react-native/issues/36494
                  if (iOSTextInputWorkaroundRef.current) {
                    iOSTextInputWorkaroundRef.current = false;
                    return;
                  }

                  onChange(txt);
                }}
                value={value}
                multiline={true}
                placeholder={strings.DESCRIPTION_PLACEHOLDER}
                style={styles.description}
                error={errors?.description?.message}
              />
            )}
            name="description"
          />
        </View>
      </Collapsible>
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
  description: {
    maxHeight: 100,
    fontSize: 15,
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
});

export default memo(TimesheetForm);
