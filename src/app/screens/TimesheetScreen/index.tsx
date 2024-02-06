import React, {useContext} from 'react';

import EmployeeList from './view/employeeList';
import TimesheetList from './view/timesheetList';

import {isManagement} from '../../utils/user';
import UserContext from '../../context/user.context';

const TimesheetScreen = () => {
  const [userContextData] = useContext(UserContext);

  const isManager = isManagement(userContextData?.userData.role);

  // useEffect(() => {
  //   if (route.params?.isAddModalOpen) {
  //     toggleModal();
  //   }
  // }, [route.params, toggleModal]);

  return <>{isManager ? <EmployeeList /> : <TimesheetList />}</>;
};

export default TimesheetScreen;
