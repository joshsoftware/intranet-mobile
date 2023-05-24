import React, {useCallback, useContext, useState} from 'react';

import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';
import FloatingActionButton from '../../components/button/floatingActionButton';
import CreateTimesheet from './view/createTimesheet';

import {isManagement} from '../../utils/user';
import UserContext from '../../context/user.context';

const TimesheetScreen = () => {
  const [userContextData] = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = useCallback(
    () => setIsModalOpen(prevState => !prevState),
    [],
  );

  const isManager = isManagement(userContextData?.userData.role);

  return (
    <>
      {isManager ? <EmployeeList /> : <TimesheetList />}
      <FloatingActionButton onPress={toggleModal} />
      <CreateTimesheet
        toggleModal={toggleModal}
        isVisible={isModalOpen}
        userId={userContextData?.userData.userId + ''}
      />
    </>
  );
};

export default TimesheetScreen;
