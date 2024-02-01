import React, {useCallback, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import Button from '../../components/button';
import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';
import CreateTimesheet from './view/createTimesheet';

import {isManagement} from '../../utils/user';
import UserContext from '../../context/user.context';

import {MainTabParamList} from '../../navigation/types';

const TimesheetScreen = () => {
  const route = useRoute<RouteProp<MainTabParamList, 'Timesheet'>>();
  const [userContextData] = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = useCallback(
    () => setIsModalOpen(prevState => !prevState),
    [],
  );

  const isManager = isManagement(userContextData?.userData.role);

  useEffect(() => {
    if (route.params?.isAddModalOpen) {
      toggleModal();
    }
  }, [route.params, toggleModal]);

  return (
    <>
      {isManager ? <EmployeeList /> : <TimesheetList />}
      <View style={styles.buttonContainer}>
        <Button
          type="tertiary"
          title="Add Your Timesheet"
          onPress={toggleModal}
        />
      </View>
      <CreateTimesheet
        toggleModal={toggleModal}
        isVisible={isModalOpen}
        defaultDate={route.params?.startDate}
        userId={userContextData?.userData.userId + ''}
      />
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});

export default TimesheetScreen;
