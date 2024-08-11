import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Text,
} from 'react-native';
import {
  useGetCoworkerList,
  useGetCoreValuesList,
  usePostAppreciation,
} from './giveAppreciation.hooks';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import Select from '../../components/select/Select';
import CenteredModal from '../../components/Modal';
import {ScrollView} from 'react-native-gesture-handler';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CoreValueInfoModal from '../../components/CoreValueInfoModal';
import {FormInput} from './types';

import {SuccessIcon, InfoIcon} from '../../constants/icons';
import {useNavigation} from '@react-navigation/native';
import {GiveAppreciationScreenNavigationProp} from '../../navigation/types';
import Button from '../../components/button/button';
import Typography from '../../components/typography';
import colors from '../../constants/colors';
import messages from '../../constants/message';

const paginationData = {
  page: 1,
  page_size: 500,
};

const schema = yup.object().shape({
  receiver: yup.string().required(messages.SELECT_COWORKER_NAME),
  core_value_id: yup.string().required(messages.SELECT_CORE_VALUE),
  description: yup.string().required(messages.ENTER_DESCIPTION),
});

const AppreciationScreen = () => {
  const navigation = useNavigation<GiveAppreciationScreenNavigationProp>();

  const [isCoreValueModalVisible, setCoreValueModalVisible] = useState(false);
  const {
    data: coworkerList,
    isLoading: isCorworkerListLoading,
    isError: isCorworkerListError,
  } = useGetCoworkerList(paginationData);

  const {
    data: coreValuesDetails,
    coreKeyValueList,
    isLoading: isCoreValueListSuccess,
    isError: isCoreValueListError,
  } = useGetCoreValuesList();

  const {
    mutate: postAppriciation,
    isLoading: isAppreciationLoading,
    isSuccess: isAppreciationSuccess,
    reset: resetPostAppreciation,
  } = usePostAppreciation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset: resetForm,
  } = useForm({
    defaultValues: {
      receiver: '',
      core_value_id: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = data => {
    let payload = {
      receiver: Number(data.receiver),
      core_value_id: Number(data.core_value_id),
      description: data.description,
    };
    postAppriciation(payload);
  };
  const handleSuccessModalClose = useCallback(() => {
    resetPostAppreciation();
    resetForm();
    navigation.goBack();
  }, [navigation, resetForm, resetPostAppreciation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.fieldWrapper}>
            <Typography type="header" style={styles.labelText}>
              Co-worker Name <Typography style={styles.asterisk}>*</Typography>
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Select
                  placeholder="Select Co-worker"
                  onChange={onChange}
                  value={value}
                  items={coworkerList}
                  search
                  error={errors?.receiver?.message}
                  disable={isCorworkerListLoading || isCorworkerListError}
                />
              )}
              name="receiver"
            />
          </View>
          <View style={styles.fieldWrapper}>
            <View style={styles.coreValueLabelWrapper}>
              <Typography type="header" style={styles.labelText}>
                Core Value <Text style={styles.asterisk}>*</Text>{' '}
              </Typography>
              <Pressable
                style={styles.infoIconWrapper}
                onPress={() => setCoreValueModalVisible(true)}>
                <InfoIcon width={16} height={16} />
              </Pressable>
            </View>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Select
                  placeholder="Select Core Value"
                  onChange={onChange}
                  value={value}
                  items={coreKeyValueList}
                  disable={isCoreValueListSuccess || isCoreValueListError}
                  error={errors?.core_value_id?.message}
                />
              )}
              name="core_value_id"
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Typography type="header" style={styles.labelText}>
              Description <Typography style={styles.asterisk}>*</Typography>
            </Typography>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <TextInput
                  style={styles.description}
                  onChangeText={onChange}
                  value={value}
                  multiline
                />
              )}
              name="description"
            />
            {errors.description && (
              <Typography type="error">{errors.description.message}</Typography>
            )}
          </View>
          <Button
            title="Submit"
            type="primary"
            onPress={handleSubmit(onSubmit)}
            disabled={isAppreciationLoading}
            isLoading={isAppreciationLoading}
          />
          <View>
            <CenteredModal
              visible={isAppreciationSuccess}
              message={
                'Your appreciation has been submitted successfully. We appreciate your feedback.'
              }
              svgImage={SuccessIcon}
              btnTitle="Okay"
              onClose={handleSuccessModalClose}
            />
          </View>
          <View>
            <CoreValueInfoModal
              visible={
                isCoreValueModalVisible && coreValuesDetails.length !== 0
              }
              onClose={() => setCoreValueModalVisible(false)}
              coreValuesDetails={coreValuesDetails}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.WHITE,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldWrapper: {
    paddingBottom: 30,
  },
  labelText: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.BLACK,
    marginBottom: 10,
  },
  asterisk: {
    color: colors.ERROR_RED,
  },
  coreValueLabelWrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  infoIconWrapper: {
    paddingHorizontal: 5,
  },
  description: {
    textAlignVertical: 'top',
    borderRadius: 4,
    borderWidth: 1,
    minHeight: 300,
    maxHeight: 600,
    borderColor: colors.MEDIUM_GRAY,
    padding: 10,
  },
  button: {
    height: 20,
    fontSize: 16,
    borderRadius: 12,
  },
});

export default AppreciationScreen;
