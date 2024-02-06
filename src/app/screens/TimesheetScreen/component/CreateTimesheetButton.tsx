import React, {useCallback, useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Button from '../../../components/button';
import UserContext from '../../../context/user.context';
import CreateTimesheet from '../view/createTimesheet';

interface IProps {
  userId?: string;
  userName?: string;
}

const CreateTimesheetButton = (props: IProps) => {
  const {userId, userName} = props;

  const [userContext] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = useCallback(() => setShowModal(v => !v), []);

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
