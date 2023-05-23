import React, {useContext, useEffect, useState} from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from '@react-navigation/drawer';

import LoginScreen from '../screens/LoginScreen';
import SplashScreen from '../screens/SplashScreen';
import DrawerContent from '../components/DrawerContent';
import ProfileScreen from '../screens/ProfileScreen';
import MainNavigator from './MainNavigator';
import TimesheetList from '../screens/TimesheetScreen/view/timesheetList';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';
import {initNotificationService} from '../services/firebase/messaging';

import {RootDrawerParamList} from './types';
import {
  LOGIN_SCREEN,
  MAIN_SCREEN,
  USER_PROFILE_SCREEN,
  USER_TIMESHEET,
} from '../constant/screenNames';
import colors from '../constant/colors';

const RootDrawer = createDrawerNavigator<RootDrawerParamList>();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
  drawerPosition: 'right',
  drawerStyle: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    backgroundColor: colors.WHITE,
  },
  drawerItemStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.TEXT_INPUT_BORDER,
  },
  drawerLabelStyle: {
    textAlign: 'right',
  },
};

const renderDrawerContent = (props: any) => <DrawerContent {...props} />;

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
    <RootDrawer.Navigator
      screenOptions={screenOptions}
      initialRouteName={MAIN_SCREEN}
      useLegacyImplementation
      drawerContent={renderDrawerContent}>
      {userContextData ? (
        <>
          <RootDrawer.Screen name={MAIN_SCREEN} component={MainNavigator} />
          <RootDrawer.Screen
            name={USER_PROFILE_SCREEN}
            component={ProfileScreen}
          />
          <RootDrawer.Screen name={USER_TIMESHEET} component={TimesheetList} />
        </>
      ) : (
        <RootDrawer.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      )}
    </RootDrawer.Navigator>
  );
};

export default RootNavigator;
