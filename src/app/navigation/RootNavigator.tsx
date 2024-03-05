import React, {useContext, useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import {checkVersion} from 'react-native-check-version';

import LoginScreen from '../screens/LoginScreen';
import TimesheetList from '../screens/TimesheetScreen/view/timesheetList';
import ProfileScreen from '../screens/ProfileScreen';
import LeaveDetailScreen from '../screens/LeaveScreen/ManagementLeaveScreen/LeaveDetailScreen';
import LoginInstructionScreen from '../screens/LoginScreen/LoginInstructionScreen';
import OTPAuthenticationScreen from '../screens/LoginScreen/OTPAuthenticationScreen';
import UpdateVersionScreen from '../screens/UpdateVersion';
import NoVersionScreen from '../screens/UpdateVersion/NoVersionInfo';
import DrawerNavigator from './DrawerNavigation';
import {navigationRef} from '.';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';

import {RootStackParamList} from './types';
import {
  DRAWER,
  LEAVE_DETAIL_SCREEN,
  LOGIN_INSTRUCTION_SCREEN,
  LOGIN_SCREEN,
  NO_VERSION,
  OTP_AUTHENTICATION_SCREEN,
  UPDATE_VERSION,
  USER_PROFILE_SCREEN,
  USER_TIMESHEET,
} from '../constant/screenNames';
import colors from '../constant/colors';
import {BUNDLE_ID} from '../constant';

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
  const [needsUpdate, setNeedsUpdate] = useState<boolean | null>(false);

  useEffect(() => {
    const run = async () => {
      try {
        const version = await checkVersion({
          bundleId: BUNDLE_ID,
        });
        setNeedsUpdate(version.needsUpdate);
      } catch {}

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
        {needsUpdate === null ? (
          <RootStack.Screen name={NO_VERSION} component={NoVersionScreen} />
        ) : needsUpdate ? (
          <RootStack.Screen
            name={UPDATE_VERSION}
            component={UpdateVersionScreen}
          />
        ) : userContextData ? (
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
          <>
            <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
            <RootStack.Screen
              name={LOGIN_INSTRUCTION_SCREEN}
              component={LoginInstructionScreen}
            />
            <RootStack.Screen
              name={OTP_AUTHENTICATION_SCREEN}
              component={OTPAuthenticationScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
