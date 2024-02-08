import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import Button from '../../../components/button';
import CreateTimesheet from '../view/createTimesheet';
import UserContext from '../../../context/user.context';
import {UserTimesheetRouteProp} from '../../../navigation/types';

interface IProps {
  userId?: string;
  userName?: string;
}

const CreateTimesheetButton = (props: IProps) => {
  const route = useRoute<UserTimesheetRouteProp>();
  const {userId, userName} = props;

  const [userContext] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(v => !v), []);

  useEffect(() => {
    if (route.params?.isAddModalOpen) {
      toggleModal();
    }
  }, [route.params, toggleModal]);

  if (!userContext) {
    return null;
  }

  const userContextId = userContext.userData.userId;
  const isSelf = !userId || userId === userContextId;

  return (
    <View style={styles.container}>
      <Button
        type="tertiary"
        title={
          isSelf
            ? 'Add Your Timesheet'
            : `Add Timesheet ${userName ? 'for ' + userName : ''}`
        }
        onPress={toggleModal}
      />
      <CreateTimesheet
        userId={userId || userContextId}
        userName={userName}
        isVisible={showModal}
        toggleModal={toggleModal}
        defaultDate={route.params?.endDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 16,
  },
});

export default CreateTimesheetButton;
