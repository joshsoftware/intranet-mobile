import React, {useContext, useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import UserProfile from '../screens/userProfile';
import MainNavigator from './MainNavigator';

import GlobalContext from '../context/global.context';
import AsyncStore from '../services/asyncStorage';
import {initNotificationService} from '../services/firebase/messaging';

import {RootStackParamList} from './types';
import {
  LOGIN_SCREEN,
  MAIN_SCREEN,
  USER_PROFILE_SCREEN,
} from '../constant/screenNames';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  const [globalData, setGlobalData] = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      // Setup Application to receive notifications
      await initNotificationService();

      const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
      const userData = await AsyncStore.getItem(AsyncStore.USER_DATA);

      if (authToken === null || authToken === '' || userData === null) {
        setGlobalData(null);
      } else {
        setGlobalData({authToken, userData: JSON.parse(userData)});
      }

      await new Promise<void>(resolve => setTimeout(resolve, 1000));

      setLoading(false);
    };

    run();
  }, [setGlobalData]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      {globalData ? (
        <>
          <RootStack.Screen name={MAIN_SCREEN} component={MainNavigator} />
          <RootStack.Screen
            name={USER_PROFILE_SCREEN}
            component={UserProfile}
          />
        </>
      ) : (
        <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
