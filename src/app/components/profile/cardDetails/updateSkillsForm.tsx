import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, useQuery} from 'react-query';

import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import Input from '../../../components/input';
import CustomChip from '../../customChip';
import Button from '../../../components/button';

import toast from '../../../utils/toast';
import skillsFormatter from '../../../utils/userProfile/skillsFormatter';
import {
  getAllSkillRequest,
  updateSkillRequest,
} from '../../../services/api/userProfile';

import colors from '../../../constant/colors';
import strings from '../../../constant/strings';
import {skillsType, updateSkillFormDataType} from '../../../types';

import {flexStyles} from '../../../../styles';
import {useIsKeyboardShown} from '../../../hooks/useIsKeyboardShown';

type Props = {
  defaultData?: skillsType;
  toggleModal: () => void;
  refresh: () => void;
};

type setType = Set<string>;

const UpdateSkillForm = ({defaultData, toggleModal, refresh}: Props) => {
  const keyboardIsVisible = useIsKeyboardShown();
  const [otherSkillsStore, setOtherSkillsStore] = useState(new Set());

  const updateSkillFormSchema = yup.object().shape({
    primaryTechnicalSkill: yup.string().required(),
    secondaryTechnicalSkill: yup
      .string()
      .when(['primaryTechnicalSkill'], ([primaryTechnicalSkill], schema) => {
        return schema.test(
          'primary must exist',
          'Primary skill must be filled!',
          value => !value || primaryTechnicalSkill,
        );
      })
      .when(['primaryTechnicalSkill'], ([primaryTechnicalSkill], schema) => {
        return schema.test(
          'secondary skill unique',
          'Secondary skill must be unique!',
          value => !value || value !== primaryTechnicalSkill,
        );
      }),
    ternaryTechnicalSkill: yup
      .string()
      .when(
        ['primaryTechnicalSkill', 'secondaryTechnicalSkill'],
        ([primaryTechnicalSkill, secondaryTechnicalSkill], schema) => {
          return schema.test(
            'primary and secondary must exist',
            'Primary skill and Secondary skill must be filled!',
            value =>
              !value || (primaryTechnicalSkill && secondaryTechnicalSkill),
          );
        },
      )
      .when(
        ['primaryTechnicalSkill', 'secondaryTechnicalSkill'],
        ([primaryTechnicalSkill, secondaryTechnicalSkill], schema) => {
          return schema.test(
            'primary and secondary must exist',
            'Ternary skill must be unique!',
            value =>
              !value ||
              (value !== primaryTechnicalSkill &&
                value !== secondaryTechnicalSkill),
          );
        },
      ),
    otherSkills: yup
      .string()
      .when(
        [
          'primaryTechnicalSkill',
          'secondaryTechnicalSkill',
          'ternaryTechnicalSkill',
        ],
        (
          [
            primaryTechnicalSkill,
            secondaryTechnicalSkill,
            ternaryTechnicalSkill,
          ],
          schema,
        ) => {
          return schema.test(
            'skills must be unique',
            'Skills must be unique!',
            _ =>
              !(
                otherSkillsStore.has(primaryTechnicalSkill) ||
                otherSkillsStore.has(secondaryTechnicalSkill) ||
                otherSkillsStore.has(ternaryTechnicalSkill)
              ),
          );
        },
      ),
  });

  const {data} = useQuery({
    queryKey: ['getskills'],
    queryFn: getAllSkillRequest,
    initialData: [],
  });

  const mutation = useMutation(updateSkillRequest, {
    onSuccess: () => {
      toggleModal();
      resetField('primaryTechnicalSkill');
      resetField('secondaryTechnicalSkill');
      resetField('ternaryTechnicalSkill');
      resetField('otherSkills');
      refresh();
      toast(strings.UPDATE_SKILLS_SUCCESS);
    },
    retry: false,
    onError: error => {
      if (error) {
        toggleModal();
        toast(strings.UPDATE_SKILLS_ERROR, 'error');
      }
    },
  });

  const skillsListData = data?.map((item: string) => ({
    label: item,
    value: item,
  }));

  useEffect(() => {
    if (defaultData) {
      setOtherSkillsStore(
        new Set(skillsFormatter(defaultData.otherSkills as string)),
      );
    }
  }, [defaultData]);

  const {
    handleSubmit,
    control,
    resetField,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    defaultValues: defaultData
      ? {
          primaryTechnicalSkill: defaultData.primarySkill || '',
          secondaryTechnicalSkill: defaultData.secondarySkill || '',
          ternaryTechnicalSkill: defaultData.ternarySkill || '',
          otherSkills: '',
        }
      : {
          primaryTechnicalSkill: undefined,
          secondaryTechnicalSkill: undefined,
          ternaryTechnicalSkill: undefined,
          otherSkills: undefined,
        },
    resolver: yupResolver(updateSkillFormSchema),
  });

  const onDeleteOtherSkills = useCallback((skill: string) => {
    setOtherSkillsStore(otherSkillsStoreInstance => {
      const temperoryStore = new Set(otherSkillsStoreInstance);
      temperoryStore.delete(skill);
      return temperoryStore;
    });
  }, []);

  const setToSkill = (skillData: setType): string => {
    return Array.from(skillData).toString();
  };
  const onSave = (formData: updateSkillFormDataType) => {
    const otherSkills = setToSkill(otherSkillsStore as setType);
    const resData: skillsType = {
      primarySkill: formData.primaryTechnicalSkill
        ? formData.primaryTechnicalSkill
        : '',
      secondarySkill: formData.secondaryTechnicalSkill
        ? formData.secondaryTechnicalSkill
        : '',
      ternarySkill: formData.ternaryTechnicalSkill
        ? formData.ternaryTechnicalSkill
        : '',
      otherSkills: otherSkills ? otherSkills : '',
    };

    mutation.mutate(resData);
  };

  const handleOnSubmitEditing = (value: string | undefined) => {
    if (value === undefined || errors.otherSkills || value.length < 1) {
    } else {
      setOtherSkillsStore(
        otherSkillsStoreInstance =>
          new Set(otherSkillsStoreInstance.add(value)),
      );
    }
    resetField('otherSkills');
  };

  return (
    <>
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
                disabled={mutation.isLoading}
                onValueChange={onChange}
                value={value ? value : strings.SELECT}
                items={skillsListData}
              />
            )}
            name="primaryTechnicalSkill"
          />
          {errors.primaryTechnicalSkill && (
            <Typography style={styles.error} type="description">
              {errors.primaryTechnicalSkill.message}
            </Typography>
          )}
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
                disabled={mutation.isLoading}
                onValueChange={onChange}
                value={value ? value : strings.SELECT}
                items={skillsListData}
              />
            )}
            name="secondaryTechnicalSkill"
          />
          {errors.secondaryTechnicalSkill && (
            <Typography style={styles.error} type="description">
              {errors.secondaryTechnicalSkill.message}
            </Typography>
          )}
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
                disabled={mutation.isLoading}
                onValueChange={onChange}
                value={value ? value : strings.SELECT}
                items={skillsListData}
              />
            )}
            name="ternaryTechnicalSkill"
          />
          {errors.ternaryTechnicalSkill && (
            <Typography style={styles.error} type="description">
              {errors.ternaryTechnicalSkill.message}
            </Typography>
          )}
        </View>

        <View style={styles.fieldStyle}>
          <Typography type="header" style={styles.labelText}>
            Other Skills
          </Typography>
          <View style={styles.otherSkillsStyle}>
            {(Array.from(otherSkillsStore) as string[]).map(
              (skill: string, index: number) => {
                return (
                  <CustomChip
                    key={index}
                    label={skill}
                    mode="edit"
                    onDeleteOtherSkills={onDeleteOtherSkills}
                  />
                );
              },
            )}
          </View>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                onSubmitEditing={() => {
                  handleOnSubmitEditing(value);
                }}
                placeholder="Type other skills here"
                style={styles.descText}
              />
            )}
            name="otherSkills"
          />
          {errors.otherSkills && (
            <Typography style={styles.error} type="description">
              {errors.otherSkills.message}
            </Typography>
          )}
        </View>

        <Text style={styles.otherSkillNoteText}>
          (Note: Mention your skills which are not covered in technical skills)
        </Text>
      </>

      {!keyboardIsVisible && (
        <View style={[flexStyles.horizontal, styles.btns]}>
          <View style={styles.cancel}>
            <Button
              title="Cancel"
              disabled={mutation.isLoading}
              onPress={toggleModal}
              type="secondary"
            />
          </View>
          <View style={styles.save}>
            <Button
              title="save"
              isLoading={mutation.isLoading}
              onPress={handleSubmit(onSave)}
              type="primary"
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  labelText: {
    textAlign: 'left',
    marginBottom: 15,
  },
  fieldStyle: {
    marginBottom: 15,
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
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#D0DDFF',
  },
  error: {
    color: colors.ERROR_RED,
    marginTop: 5,
  },
  btns: {
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  cancel: {
    width: '45%',
  },

  save: {
    width: '45%',
  },
  otherSkillsStyle: {flexDirection: 'row', flexWrap: 'wrap'},
  otherSkillNoteText: {
    color: colors.SECONDARY_TEXT,
    paddingBottom: 20,
  },
});

export default memo(UpdateSkillForm);
