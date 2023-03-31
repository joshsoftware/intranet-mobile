import React, {useContext, useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';
import SplashScreen from '../screens/SplashScreen';
import {RootStackParamList} from './types';
import {LOGIN_SCREEN, MAIN_SCREEN} from '../constant/screenNames';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      const authToken = await AsyncStore.getAuthToken();

      if (authToken === null || authToken === '') {
        setUser(null);
      } else {
        setUser({token: authToken});
      }

      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      setLoading(false);
    };

    run();
  }, [setUser]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      {user ? (
        <RootStack.Screen name={MAIN_SCREEN} component={MainScreen} />
      ) : (
        <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
