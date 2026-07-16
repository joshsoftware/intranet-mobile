import React, {useContext, useEffect, useState} from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
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
import DeviceInfo from 'react-native-device-info';


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

const RootStack = createStackNavigator<RootStackParamList>();

const screenOptions: StackNavigationOptions = {
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

const isVersionGreater = (storeVersion: string, localVersion: string): boolean => {
  if (!storeVersion || !localVersion) {
    return false;
  }
  const storeParts = storeVersion.split('.').map(Number);
  const localParts = localVersion.split('.').map(Number);
  for (let i = 0; i < Math.max(storeParts.length, localParts.length); i++) {
    const storeVal = storeParts[i] || 0;
    const localVal = localParts[i] || 0;
    if (storeVal > localVal) {
      return true;
    }
    if (storeVal < localVal) {
      return false;
    }
  }
  return false;
};

const RootNavigator = () => {
  const [userContextData, setUserContextData] = useContext(UserContext);
  const [versionContextData, setVersionContextData] =
    useContext(VersionContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        try {
          const bundleId = DeviceInfo.getBundleId();
          const currentVersion = DeviceInfo.getVersion();
          if (bundleId === 'com.joshsoftware.intranet' && !__DEV__) {
            const version = await checkVersion({
              bundleId: BUNDLE_ID,
              currentVersion: currentVersion,
            });
            const needsUpdate = version.version ? isVersionGreater(version.version, currentVersion) : false;
            setVersionContextData({
              ...version,
              needsUpdate: needsUpdate,
            });
          } else {
            setVersionContextData({
              version: currentVersion,
              needsUpdate: false,
              url: '',
            } as any);
          }
        } catch {}

        const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);
        const userData = await AsyncStore.getItem(AsyncStore.USER_DATA);
        if (authToken === null || authToken === '' || userData === null) {
          setUserContextData(null);
        } else {
          setUserContextData({authToken, userData: JSON.parse(userData)});
        }
      } finally {
        await new Promise<void>(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      }
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
                headerBackTitleVisible: false,
              }}
            />
            <RootStack.Screen
              name={APPRECIATION_DETAILS_SCREEN}
              component={AppreciationDetailsScreen}
              options={{
                headerTitle: '',
                headerShadowVisible: false,
                headerShown: true,
                headerBackTitleVisible: false,
              }}
            />
            <RootStack.Screen
              name={PROFILE_DETAILS_SCREEN}
              component={ProfileDetailScreen}
              options={{
                headerShadowVisible: false,
                headerShown: true,
                headerTitle: 'Profile',
                headerBackTitleVisible: false,
              }}
            />
            <RootStack.Screen
              name={APPRECIATION_SEARCH_SCREEN}
              component={SearchScreen}
              options={{
                headerShown: true,
                headerTitle: '',
                headerShadowVisible: false,
                headerBackTitleVisible: false,
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
