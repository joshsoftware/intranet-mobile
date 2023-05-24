import React, {useContext, useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';
import {initNotificationService} from '../services/firebase/messaging';
import DrawerNavigator from './DrawerNavigation';

import {RootStackParamList} from './types';
import {
  DRAWER,
  LEAVE_DETAIL_SCREEN,
  LOGIN_SCREEN,
  USER_PROFILE_SCREEN,
  USER_TIMESHEET,
} from '../constant/screenNames';
import TimesheetList from '../screens/TimesheetScreen/view/timesheetList';
import ProfileScreen from '../screens/ProfileScreen';
import LeaveDetailScreen from '../screens/LeaveDetailScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  const [userContextData, setUserContextData] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      // Setup Application to receive notifications
      await initNotificationService();

      const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
      const userData = await AsyncStore.getItem(AsyncStore.USER_DATA);
      if (authToken === null || authToken === '' || userData === null) {
        setUserContextData(null);
      } else {
        setUserContextData({authToken, userData: JSON.parse(userData)});
      }

      await new Promise<void>(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    run();
  }, [setUserContextData]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator
      screenOptions={screenOptions}
      initialRouteName={DRAWER}>
      {userContextData ? (
        <>
          <RootStack.Screen name={DRAWER} component={DrawerNavigator} />

          <RootStack.Screen name={USER_TIMESHEET} component={TimesheetList} />
          <RootStack.Screen
            name={USER_PROFILE_SCREEN}
            component={ProfileScreen}
          />
          <RootStack.Screen
            name={LEAVE_DETAIL_SCREEN}
            component={LeaveDetailScreen}
          />
        </>
      ) : (
        <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      )}
    </RootStack.Navigator>
  );
};

export default RootNavigator;
