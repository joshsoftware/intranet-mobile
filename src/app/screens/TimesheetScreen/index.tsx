import React, {useContext, useState} from 'react';

import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';
import UserContext from '../../context/user.context';
import FloatingActionButton from '../../components/button/floatingActionButton';
import CreateTimesheet from './view/createTimesheet';

const TimesheetScreen = () => {
  const [userContextData] = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen(prevState => !prevState);

  const isManager = userContextData?.userData.role === 'Manager';

  return (
    <>
      {isManager ? <EmployeeList /> : <TimesheetList />}
      <FloatingActionButton onPress={toggleModal} />
      <CreateTimesheet
        toggleModal={toggleModal}
        isVisible={isModalOpen}
        userId={userContextData?.userData.userId + ''}
        current_user={userContextData?.userData.userId + ''}
      />
    </>
  );
};

export default TimesheetScreen;
