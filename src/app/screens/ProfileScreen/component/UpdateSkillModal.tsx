import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {StyleSheet, View, Text} from 'react-native';
import * as yup from 'yup';

import Modal from '../../../components/modal';

import {useSkillList, useUpdateSkills} from '../profile.hooks';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';

import {ISkillsData} from '../interface/skills';
import {yupResolver} from '@hookform/resolvers/yup';
import Button from '../../../components/button';
import colors from '../../../constant/colors';
import Input from '../../../components/input';
import CustomChip from '../../../components/customChip';
import PickerSelect from '../../../components/pickers/pickerSelect';
import strings from '../../../constant/strings';
import {ScrollView} from 'react-native-gesture-handler';
import fonts from '../../../constant/fonts';

interface Props {
  isVisible: boolean;
  closeModal: () => void;
  skillsData: ISkillsData;
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
            value === '' ||
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

function UpdateSkillModal({isVisible, closeModal, refresh, skillsData}: Props) {
  const keyboardIsVisible = useIsKeyboardShown();
  const [otherSkillFieldValue, setOtherSkillFieldValue] = useState('');

  const skillsList = useSkillList();
  const {updateSkills, isLoading} = useUpdateSkills(closeModal, refresh);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    defaultValues: skillsData,
    resolver: yupResolver(updateSkillFormSchema),
  });

  console.log(getValues());

  const onSubmit = (formData: ISkillsData) => {
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
    <Modal
      isVisible={isVisible}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      contentStyle={styles.contentStyle}>
      <ScrollView>
        <Text style={styles.title}>Update Skills</Text>

        <View style={styles.fieldStyle}>
          <Text style={styles.labelText}>Primary Technical Skill</Text>
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
          <Text style={styles.labelText}>Secondary Technical Skill</Text>
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
          <Text style={styles.labelText}>Ternary Technical Skill</Text>
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
          <Text style={styles.labelText}>Other Skills</Text>
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
            <Text style={styles.error}>{errors.otherSkills.message}</Text>
          )}

          <Text style={styles.otherSkillNoteText}>
            (Note: Mention your skills which are not covered in technical
            skills.)
          </Text>
        </View>

        {!keyboardIsVisible && (
          <View style={styles.buttonRow}>
            <View style={styles.buttonContainer}>
              <Button
                title="Cancel"
                disabled={isLoading}
                onPress={closeModal}
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
      </ScrollView>
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
  title: {
    color: colors.SECONDARY,
    fontFamily: fonts.ARIAL_BOLD,
    marginVertical: 20,
  },
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
    color: colors.SECONDARY,
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

export default UpdateSkillModal;
