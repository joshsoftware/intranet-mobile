import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {StyleProp, ViewStyle} from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import LeaveScreen from '../screens/LeaveScreen';
import TimesheetScreen from '../screens/TimesheetScreen';
import TabBar from '../components/TabBar';
import Header from '../components/header';

import {
  HOME_SCREEN,
  LEAVE_SCREEN,
  TIMESHEET_SCREEN,
} from '../constant/screenNames';
import {MainTabParamList} from './types';

const MainTab = createBottomTabNavigator<MainTabParamList>();

const screenOptions: BottomTabNavigationOptions = {
  header: () => <Header type="primary" />,
  tabBarHideOnKeyboard: true,
};

const sceneContainerStyle: StyleProp<ViewStyle> = {
  backgroundColor: '#FFFFFF',
  flex: 1,
};

const getTabBar = (props: BottomTabBarProps) => <TabBar {...props} />;

const MainNavigator = () => {
  return (
    <MainTab.Navigator
      screenOptions={screenOptions}
      tabBar={getTabBar}
      sceneContainerStyle={sceneContainerStyle}>
      <MainTab.Screen name={HOME_SCREEN} component={HomeScreen} />
      <MainTab.Screen name={LEAVE_SCREEN} component={LeaveScreen} />
      <MainTab.Screen name={TIMESHEET_SCREEN} component={TimesheetScreen} />
    </MainTab.Navigator>
  );
};

export default MainNavigator;
