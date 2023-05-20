import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';

import {skillsType} from '../../../types';
import {yupResolver} from '@hookform/resolvers/yup';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';
import Button from '../../../components/button';
import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import strings from '../../../constant/strings';
import CustomChip from '../../../components/customChip';
import Input from '../../../components/input';
import colors from '../../../constant/colors';
import {useSkillList, useUpdateSkills} from '../profile.hooks';

interface Props {
  userSkills: skillsType;
  toggleModal: () => void;
  refresh: () => void;
}

const updateSkillFormSchema = yup.object().shape({
  primarySkill: yup.string().required(),
  secondarySkill: yup
    .string()
    .nullable()
    .when(['primarySkill'], ([primarySkill], schema) => {
      return schema.test(
        'primary must exist',
        'Primary skill must be filled!',
        value => !value || primarySkill,
      );
    })
    .when(['primarySkill'], ([primarySkill], schema) => {
      return schema.test(
        'secondary skill unique',
        'Secondary skill must be unique!',
        value => !value || value !== primarySkill,
      );
    }),
  ternarySkill: yup
    .string()
    .nullable()
    .when(
      ['primarySkill', 'secondarySkill'],
      ([primarySkill, secondarySkill], schema) => {
        return schema.test(
          'primary and secondary must exist',
          'Primary skill and Secondary skill must be filled!',
          value => !value || (primarySkill && secondarySkill),
        );
      },
    )
    .when(
      ['primarySkill', 'secondarySkill'],
      ([primarySkill, secondarySkill], schema) => {
        return schema.test(
          'ternary unique',
          'Ternary skill must be unique!',
          value =>
            !value || (value !== primarySkill && value !== secondarySkill),
        );
      },
    ),
  otherSkills: yup
    .string()
    .when(
      ['primarySkill', 'secondarySkill', 'ternarySkill'],
      ([primarySkill, secondarySkill, ternarySkill], schema) => {
        return schema.test(
          'other skills unique',
          'Other skills must be unique',
          value =>
            value
              ?.split(',')
              .filter(e => e !== '')
              .findIndex(
                e =>
                  e.toLowerCase() === primarySkill?.toLowerCase() ||
                  e.toLowerCase() === secondarySkill?.toLowerCase() ||
                  e.toLowerCase() === ternarySkill?.toLowerCase(),
              ) === -1,
        );
      },
    ),
});

function UpdateSkillForm({userSkills, toggleModal, refresh}: Props) {
  const keyboardIsVisible = useIsKeyboardShown();
  const [otherSkillFieldValue, setOtherSkillFieldValue] = useState('');

  const skillsList = useSkillList();
  const {updateSkills, isLoading} = useUpdateSkills(toggleModal, refresh);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    defaultValues: userSkills,
    resolver: yupResolver(updateSkillFormSchema),
  });

  const onSubmit = (formData: skillsType) => {
    updateSkills({
      primarySkill: formData.primarySkill || '',
      secondarySkill: formData.secondarySkill || '',
      ternarySkill: formData.ternarySkill || '',
      otherSkills: formData.otherSkills || '',
    });
  };

  const handleOtherSkillSubmit = () => {
    const {otherSkills} = getValues();

    const skills = otherSkills?.split(',').filter(e => e !== '') || [];

    if (skills.findIndex(e => e === otherSkillFieldValue) === -1) {
      skills.push(otherSkillFieldValue);

      setValue('otherSkills', skills.join(','));
    }

    setOtherSkillFieldValue('');
  };

  const onDeleteOtherSkills = (skill: string) => {
    const {otherSkills} = getValues();

    const skills =
      otherSkills?.split(',').filter(e => e !== '' && e !== skill) || [];

    setValue('otherSkills', skills.join(','));
  };

  return (
    <>
      <View style={styles.fieldStyle}>
        <Typography type="header" style={styles.labelText}>
          Primary Technical Skill
        </Typography>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <PickerSelect
              placeholder={{
                label: strings.SELECT,
                value: '',
              }}
              error={errors.primarySkill?.message}
              disabled={isLoading}
              onValueChange={onChange}
              value={value ? value : strings.SELECT}
              items={skillsList}
            />
          )}
          name="primarySkill"
        />
      </View>

      <View style={styles.fieldStyle}>
        <Typography type="header" style={styles.labelText}>
          Secondary Technical Skill
        </Typography>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <PickerSelect
              placeholder={{
                label: strings.SELECT,
                value: '',
              }}
              error={errors.secondarySkill?.message}
              disabled={isLoading}
              onValueChange={onChange}
              value={value ? value : strings.SELECT}
              items={skillsList}
            />
          )}
          name="secondarySkill"
        />
      </View>

      <View style={styles.fieldStyle}>
        <Typography type="header" style={styles.labelText}>
          Ternary Technical Skill
        </Typography>
        <Controller
          control={control}
          render={({field: {onChange, value}}) => (
            <PickerSelect
              placeholder={{
                label: strings.SELECT,
                value: '',
              }}
              error={errors.ternarySkill?.message}
              disabled={isLoading}
              onValueChange={onChange}
              value={value ? value : strings.SELECT}
              items={skillsList}
            />
          )}
          name="ternarySkill"
        />
      </View>

      <View style={styles.fieldStyle}>
        <Typography type="header" style={styles.labelText}>
          Other Skills
        </Typography>
        <Controller
          control={control}
          render={({field: {value}}) => (
            <>
              <View style={styles.otherSkillChipContainer}>
                {value
                  ?.split(',')
                  .filter(e => e)
                  .map((skill: string, index: number) => {
                    return (
                      <CustomChip
                        key={index}
                        label={skill}
                        mode="edit"
                        onDeleteOtherSkills={onDeleteOtherSkills}
                      />
                    );
                  })}
              </View>
              <Input
                onChangeText={setOtherSkillFieldValue}
                value={otherSkillFieldValue}
                onSubmitEditing={handleOtherSkillSubmit}
                placeholder="Type other skills here"
                style={styles.descText}
              />
            </>
          )}
          name="otherSkills"
        />
        {errors.otherSkills && (
          <Typography style={styles.error} type="description">
            {errors.otherSkills.message}
          </Typography>
        )}
      </View>

      {!keyboardIsVisible && (
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button
              title="Cancel"
              disabled={isLoading}
              onPress={toggleModal}
              type="secondary"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Save"
              isLoading={isLoading}
              onPress={handleSubmit(onSubmit)}
              type="primary"
            />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 5,
  },
  fieldStyle: {
    marginBottom: 15,
  },
  labelText: {
    textAlign: 'left',
    marginBottom: 15,
  },
  otherSkillChipContainer: {flexDirection: 'row', flexWrap: 'wrap'},
  otherSkillNoteText: {
    color: colors.SECONDARY_TEXT,
    paddingBottom: 20,
  },
  descText: {
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'left',
  },
  error: {
    color: colors.ERROR_RED,
    marginTop: 5,
  },
});

export default UpdateSkillForm;
