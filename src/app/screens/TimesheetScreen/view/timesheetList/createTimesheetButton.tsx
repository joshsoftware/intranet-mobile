import React, {memo, useCallback, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Button from '../../../../components/button';
import CreateTimesheet from '../createTimesheet';

import {UserTimesheetRouteProp} from '../../../../navigation/types';

type Props = {
  name: string;
  userId: string;
};

const CreateTimesheetButton: React.FC<Props> = ({name, userId}) => {
  const route = useRoute<UserTimesheetRouteProp>();
  const insets = useSafeAreaInsets();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleModal = useCallback(() => setIsVisible(v => !v), []);

  useEffect(() => {
    if (route.params?.isAddModalOpen) {
      toggleModal();
    }
  }, [route.params, toggleModal]);

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom}]}>
      <Button
        type="tertiary"
        title="Add timesheet for this user"
        onPress={toggleModal}
      />
      <CreateTimesheet
        userId={userId}
        isVisible={isVisible}
        toggleModal={toggleModal}
        defaultDate={route.params?.startDate}
        userName={name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
});

export default memo(CreateTimesheetButton);
