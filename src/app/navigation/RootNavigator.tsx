import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';

import {RootStackParamList} from './types';
import {
  LOGIN_SCREEN,
  MAIN_SCREEN,
  USER_PROFILE_SCREEN,
} from '../constant/screenNames';
import UserProfileScreen from '../screens/UserProfileScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const RootNavigator = () => {
  return (
    <RootStack.Navigator screenOptions={screenOptions}>
      {/* This for Testing user profile division */}
      <RootStack.Screen
        name={USER_PROFILE_SCREEN}
        component={UserProfileScreen}
      />
      <RootStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <RootStack.Screen name={MAIN_SCREEN} component={MainScreen} />
    </RootStack.Navigator>
  );
};

export default RootNavigator;
