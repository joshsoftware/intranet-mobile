import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useMutation, useQuery} from 'react-query';

import Typography from '../../../components/typography';
import PickerSelect from '../../../components/pickers/pickerSelect';
import Input from '../../../components/input';
import CustomChip from '../../customChip';
import Button from '../../../components/button';

import bottomToast from '../../../utils/toast';
import skillsFormatter from '../../../utils/userProfile/skillsFormatter';
import {
  getAllSkillRequest,
  updateSkillRequest,
} from '../../../services/api/userProfile';

import colors from '../../../constant/colors';
import strings from '../../../constant/strings';
import {skillsType, updateSkillFormDataType} from '../../../types';

import {flexStyles} from '../../../../styles';

type Props = {
  defaultData?: skillsType;
  toggleModal: () => void;
  refresh: () => void;
};

type setType = Set<string>;

const UpdateSkillForm = ({defaultData, toggleModal, refresh}: Props) => {
  const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);
  const [otherSkillsStore, setOtherSkillsStore] = useState(new Set());

  const updateSkillFormSchema = useMemo(
    () =>
      yup.object().shape({
        primaryTechnicalSkill: yup
          .string()
          .required()
          .test(
            'unique',
            'Unique Skills required.',
            value => !value || !otherSkillsStore.has(value),
          ),
        secondaryTechnicalSkill: yup
          .string()
          .when(
            ['primaryTechnicalSkill'],
            ([primaryTechnicalSkill], schema) => {
              return schema

                .test('unique', 'Unique skills required.', value => {
                  return (
                    !value ||
                    (!otherSkillsStore.has(value) &&
                      value !== primaryTechnicalSkill)
                  );
                })
                .test(
                  'priamary skill exist',
                  'Please fill primary skills first.',
                  value => primaryTechnicalSkill || !value,
                );
            },
          ),
        ternaryTechnicalSkill: yup
          .string()
          .when(
            ['secondaryTechnicalSkill', 'primaryTechnicalSkill'],
            ([secondaryTechnicalSkill, primaryTechnicalSkill], schema) => {
              return schema
                .test('unique', 'Unique skills required.', value => {
                  return (
                    !value ||
                    (value !== primaryTechnicalSkill &&
                      value !== secondaryTechnicalSkill &&
                      !otherSkillsStore.has(value))
                  );
                })
                .test(
                  'ternary must exist',
                  'Please fill secondary skills first.',
                  value => secondaryTechnicalSkill || !value,
                );
            },
          ),
        otherSkills: yup
          .string()
          .when(
            [
              'secondaryTechnicalSkill',
              'ternaryTechnicalSkill',
              'primaryTechnicalSkill',
            ],
            (
              [
                secondaryTechnicalSkill,
                ternaryTechnicalSkill,
                primaryTechnicalSkill,
              ],
              schema,
            ) => {
              return schema
                .test('unique', 'Unique skills required.', value => {
                  return (
                    !value ||
                    (!otherSkillsStore.has(value) &&
                      value !== primaryTechnicalSkill &&
                      value !== secondaryTechnicalSkill &&
                      value !== ternaryTechnicalSkill)
                  );
                })
                .test(
                  'ternary must exist',
                  'Please fill ternary skills first.',
                  () => ternaryTechnicalSkill || !otherSkillsStore.size,
                );
            },
          ),
      }),
    [otherSkillsStore],
  );

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
      bottomToast(strings.UPDATE_SKILLS_SUCCESS);
    },
    retry: false,
    onError: error => {
      if (error) {
        toggleModal();
        bottomToast(strings.UPDATE_SKILLS_ERROR, true);
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
          primaryTechnicalSkill: defaultData.primarySkill
            ? defaultData.primarySkill
            : '',
          secondaryTechnicalSkill: defaultData.secondarySkill
            ? defaultData.secondarySkill
            : '',
          ternaryTechnicalSkill: defaultData.ternarySkill
            ? defaultData.ternarySkill
            : '',
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

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardIsVisible(true);
    });
    const hideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardIsVisible(false);
    });

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

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
});

export default memo(UpdateSkillForm);
