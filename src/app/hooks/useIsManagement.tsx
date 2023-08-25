import {useContext} from 'react';

import UserContext from '../context/user.context';
import {isManagement} from '../utils/user';

function useIsManagement() {
  const [userContext] = useContext(UserContext);
  return isManagement(userContext?.userData.role);
}

export default useIsManagement;
