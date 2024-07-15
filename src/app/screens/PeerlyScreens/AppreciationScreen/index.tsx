import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  SafeAreaView,
  Pressable,
} from 'react-native';
import {
  useGetCoworkerList,
  useGetCoreValuesList,
  usePostAppreciation,
} from './appreciation.hooks';
import Typography from '../../../components/typography';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import Select from '../Components/Select';
import CenteredModal from '../Components/Modal';
import {ScrollView} from 'react-native-gesture-handler';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import CoreValueInfoModal from '../Components/CoreValueInfoModal';
import {FormInput} from './types';

import SuccessIcon from '../../../../assets/peerly/svg/Vector.svg';
import InfoIcon from '../../../../assets/peerly/svg/info.svg';

const paginationData = {
  page: 1,
  per_page: 500,
};

const schema = yup.object().shape({
  receiver: yup.number().required('Co-worker name is required'),
  core_value_id: yup.number().required('Core Value is required'),
  description: yup.string().required('Description is required'),
});

const AppreciationScreen = () => {
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
      receiver: undefined,
      core_value_id: undefined,
      description: undefined,
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = data => {
    postAppriciation(data);
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.fieldWrapper}>
          <Typography type="header" style={styles.labelText}>
            Co-worker Name
          </Typography>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Select
                placeholder="Select Co-worker"
                onValueChange={onChange}
                value={value}
                items={coworkerList}
                error={errors?.receiver?.message}
                disabled={isCorworkerListLoading || isCorworkerListError}
              />
            )}
            name="receiver"
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Typography type="header" style={styles.labelText}>
            Core Value{' '}
            <Pressable
              style={styles.infoIcon}
              onPress={() => setCoreValueModalVisible(true)}>
              <InfoIcon width={16} height={16} />
            </Pressable>
          </Typography>
          <Controller
            control={control}
            render={({field: {onChange, value}}) => (
              <Select
                placeholder="Select Core Value"
                onValueChange={onChange}
                value={value}
                items={coreKeyValueList}
                disabled={isCoreValueListSuccess || isCoreValueListError}
                error={errors?.core_value_id?.message}
              />
            )}
            name="core_value_id"
          />
        </View>
        <View style={styles.fieldWrapper}>
          <Typography type="header" style={styles.labelText}>
            Description
          </Typography>
          <Controller
            control={control}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.description}
                placeholder="Description"
                onBlur={onBlur}
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
          onPress={handleSubmit(onSubmit)}
          disabled={isAppreciationLoading}
        />
      </SafeAreaView>
      <View>
        <CenteredModal
          visible={isAppreciationSuccess}
          message={
            'Your appreciation has been submitted successfully. We appreciate your feedback.'
          }
          svgImage={SuccessIcon}
          btnTitle="Okay"
          onClose={() => {
            resetPostAppreciation();
            resetForm();
          }}
        />
      </View>
      <View>
        <CoreValueInfoModal
          visible={isCoreValueModalVisible && coreValuesDetails.length !== 0}
          onClose={() => setCoreValueModalVisible(false)}
          coreValuesDetails={coreValuesDetails}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldWrapper: {
    paddingBottom: 40,
  },
  labelText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    textAlignVertical: 'top',
    borderRadius: 4,
    borderWidth: 1,
    height: 400,
    borderColor: 'black',
  },
  button: {
    height: 20,
    fontSize: 16,
    borderRadius: 12,
  },
  infoIcon: {
    paddingTop: 10,
  },
});

export default AppreciationScreen;
