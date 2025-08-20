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
import VersionContext from '../context/version.context';
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
import {
  APPRECIATION_DETAILS_SCREEN,
  APPRECIATION_SEARCH_SCREEN,
  GIVE_APPRECIATION_SCREEN,
  HOME_SCREEN,
  PROFILE_DETAILS_SCREEN,
} from '../Peerly/constants/screenNames';
import HomeScreen from '../Peerly/screens/HomeScreen';
import AppreciationScreen from '../Peerly/screens/GiveAppreciationScreen';
import ProfileDetailScreen from '../Peerly/screens/ProfileDetailScreen';
import AppreciationDetailsScreen from '../Peerly/screens/AppreciationDetailsScreen';
import SearchScreen from '../Peerly/screens/SearchScreen';

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

const linking: any = {
  prefixes: ['intranet://'],
  config: {
    screens: {
      Drawer: {
        screens: {
          Dashboard: {
            screens: {
              Timesheet: 'timesheet',
            },
          },
        },
      },
    },
  },
};

const RootNavigator = () => {
  const [userContextData, setUserContextData] = useContext(UserContext);
  const [versionContextData, setVersionContextData] =
    useContext(VersionContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const version = await checkVersion({
          bundleId: BUNDLE_ID,
        });

        setVersionContextData(version);
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
  }, [setUserContextData, setVersionContextData]);

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer
      linking={userContextData ? linking : undefined}
      theme={theme}
      ref={navigationRef}
      onReady={() => RNBootSplash.hide({fade: true})}>
      <RootStack.Navigator
        screenOptions={screenOptions}
        initialRouteName={DRAWER}>
        {
        versionContextData === null || versionContextData.version === null ? (
          <RootStack.Screen name={NO_VERSION} component={NoVersionScreen} />
        ) 
        : versionContextData.needsUpdate ? (
          <RootStack.Screen
            name={UPDATE_VERSION}
            component={UpdateVersionScreen}
          />
        ) 
        : userContextData ? (
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
            <RootStack.Screen
              name={HOME_SCREEN}
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <RootStack.Screen
              name={GIVE_APPRECIATION_SCREEN}
              component={AppreciationScreen}
              options={{
                headerTitle: 'Appreciation',
                headerShadowVisible: false,
                headerShown: true,
              }}
            />
            <RootStack.Screen
              name={APPRECIATION_DETAILS_SCREEN}
              component={AppreciationDetailsScreen}
              options={{
                headerTitle: '',
                headerShadowVisible: false,
                headerShown: true,
              }}
            />
            <RootStack.Screen
              name={PROFILE_DETAILS_SCREEN}
              component={ProfileDetailScreen}
              options={{
                headerShadowVisible: false,
                headerShown: true,
                headerTitle: 'Profile',
              }}
            />
            <RootStack.Screen
              name={APPRECIATION_SEARCH_SCREEN}
              component={SearchScreen}
              options={{
                headerShown: true,
                headerTitle: '',
                headerShadowVisible: false,
              }}
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
