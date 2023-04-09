import React, {useContext, useEffect, useState} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import SplashScreen from '../screens/SplashScreen';

import UserContext from '../context/user.context';
import AsyncStore from '../services/asyncStorage';
import {initNotificationService} from '../services/firebase/messaging';

import {RootStackParamList} from './types';
import {
  LOGIN_SCREEN,
  MAIN_SCREEN,
  USER_PROFILE_SCREEN,
} from '../constant/screenNames';
import UserProfile from '../screens/userProfile';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  const [user, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      // Setup Application to receive notifications
      await initNotificationService();

      const authToken = await AsyncStore.getItem(AsyncStore.AUTH_TOKEN_KEY);

      if (authToken === null || authToken === '') {
        setUser(null);
      } else {
        setUser({authToken});
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
      {!user ? (
        <>
          {/* <RootStack.Screen name={MAIN_SCREEN} component={MainScreen} /> */}
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
