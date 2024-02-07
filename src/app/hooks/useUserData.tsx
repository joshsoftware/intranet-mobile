import {useContext} from 'react';
import {useNavigation} from '@react-navigation/native';

import UserContext from '../context/user.context';

const useUserData = () => {
  const [userContextData] = useContext(UserContext);
  const navigation = useNavigation();

  if (!userContextData) {
    navigation.navigate('Login');
  }

  return userContextData!.userData;
};

export default useUserData;
