import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';

import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import DatePicker from '../../../components/pickers/datePicker';
import Input from '../../../components/input/textInput';
import Button from '../../../components/button/button';

import {TimesheetFormData} from '../interfaces';

import colors from '../../../constant/colors';
import strings from '../../../constant/strings';
import {workHoursData, projectListData} from '../../../constant/timesheet';

import {flexStyles} from '../../../../styles';

const timesheetFormSchema = yup.object().shape({
  project: yup.string().required(),
  date: yup.date().required(),
  workHours: yup.string().required(),
  description: yup.string().required(),
});

type Props = {
  defaultData?: TimesheetFormData;
  onSubmit: (data?: TimesheetFormData, resetField?: Function) => void;
  isHidden: boolean;
};

const TimesheetForm = ({defaultData, onSubmit, isHidden}: Props) => {
  const {
    handleSubmit,
    control,
    resetField,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    values: defaultData
      ? defaultData
      : {
          project: undefined,
          date: undefined,
          workHours: undefined,
          description: undefined,
        },
    resolver: yupResolver(timesheetFormSchema),
  });

  return (
    <>
      {!isHidden && (
        <>
          <View>
            <Typography type="header" style={styles.labelText}>
              Project
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <PickerSelect
                  placeholder={{
                    label: strings.SELECT,
                    value: undefined,
                  }}
                  onValueChange={onChange}
                  value={value ? value : strings.SELECT}
                  items={projectListData}
                  style={styles.item}
                />
              )}
              name="project"
            />
            {errors.project && (
              <Typography style={styles.error} type="description">
                {errors.project.message}
              </Typography>
            )}
          </View>

          <View style={[flexStyles.horizontal, styles.row]}>
            <View style={styles.rowItem}>
              <Typography type="header" style={styles.labelText}>
                Select Date
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <DatePicker
                    value={value ? value : new Date()}
                    onDateChange={onChange}
                    hideIcon={false}
                    selectedDate={value}
                    style={[styles.item, styles.date]}
                    placeholder={strings.SELECT}
                    maximumDate={new Date()}
                    textStyle={{...styles.descText, ...styles.dateText}}
                  />
                )}
                name="date"
              />
              {errors.date && (
                <Typography style={styles.error} type="description">
                  {errors.date.message}
                </Typography>
              )}
            </View>

            <View style={styles.rowItem}>
              <Typography type="header" style={styles.labelText}>
                Work in hours
              </Typography>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <PickerSelect
                    placeholder={{
                      label: strings.SELECT,
                      value: undefined,
                    }}
                    onValueChange={onChange}
                    value={value ? value : strings.SELECT}
                    items={workHoursData}
                    style={styles.item}
                  />
                )}
                name="workHours"
              />
              {errors.workHours && (
                <Typography style={styles.error} type="description">
                  {errors.workHours.message}
                </Typography>
              )}
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
                  onChangeText={onChange}
                  value={value}
                  multiline={true}
                  placeholder={strings.DESCRIPTION_PLACEHOLDER}
                  style={styles.description}
                  textStyle={styles.descText}
                />
              )}
              name="description"
            />
            {errors.description && (
              <Typography style={styles.error} type="description">
                {errors.description.message}
              </Typography>
            )}
          </View>
        </>
      )}

      <Button
        title="Add"
        onPress={handleSubmit(data => onSubmit(data, resetField))}
      />
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    textAlign: 'left',
    marginVertical: 5,
  },
  description: {
    height: 80,
    alignItems: 'flex-start',
  },
  descText: {
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'left',
  },
  row: {
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
    color: colors.ERROR,
    marginTop: 5,
  },
});

export default memo(TimesheetForm);