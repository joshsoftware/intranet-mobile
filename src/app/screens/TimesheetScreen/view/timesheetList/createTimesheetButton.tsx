import React, {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../../../../components/button';
import CreateTimesheet from '../createTimesheet';

type Props = {
  name: string;
  userId: string;
};

const CreateTimesheetButton: React.FC<Props> = ({name, userId}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleModal = useCallback(() => setIsVisible(v => !v), []);

  return (
    <View style={styles.container}>
      <Button
        type="tertiary"
        title="Add timesheet for this user"
        onPress={toggleModal}
      />
      <CreateTimesheet
        userId={userId}
        isVisible={isVisible}
        toggleModal={toggleModal}
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
