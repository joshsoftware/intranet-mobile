import React, {useContext, useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';

import LoginScreen from '../screens/LoginScreen';
import TimesheetList from '../screens/TimesheetScreen/view/timesheetList';
import ProfileScreen from '../screens/ProfileScreen';
import LeaveDetailScreen from '../screens/LeaveScreen/ManagementLeaveScreen/LeaveDetailScreen';
import DrawerNavigator from './DrawerNavigation';
import {navigationRef} from '.';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';
import {initNotificationService} from '../services/firebase/messaging';

import {RootStackParamList} from './types';
import {
  DRAWER,
  LEAVE_DETAIL_SCREEN,
  LOGIN_SCREEN,
  USER_PROFILE_SCREEN,
  USER_TIMESHEET,
} from '../constant/screenNames';
import colors from '../constant/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE,
  },
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
    return null;
  }

  return (
    <NavigationContainer
      theme={theme}
      ref={navigationRef}
      onReady={() => RNBootSplash.hide({fade: true})}>
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
    </NavigationContainer>
  );
};

export default RootNavigator;
