import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native/types';

import HomeScreen from '../screens/HomeScreen';
import LeaveScreen from '../screens/LeaveScreen';
import TimesheetScreen from '../screens/Timesheet/index';
import TabBar from '../components/TabBar';

import {MainTabParamList} from './types';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const screenOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

const sceneContainerStyle: StyleProp<ViewStyle> = {
  backgroundColor: '#FFFFFF',
};

const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={screenOptions}
      tabBar={TabBar}
      sceneContainerStyle={sceneContainerStyle}>
      <MainTab.Screen name="Home" component={HomeScreen} />
      <MainTab.Screen name="Leave" component={LeaveScreen} />
      <MainTab.Screen name="Timesheet" component={TimesheetScreen} />
    </MainTab.Navigator>
  );
};

export default MainNavigator;
