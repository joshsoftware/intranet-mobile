import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {NavigationHelpers, TabNavigationState} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';

import {Home, Calendar, Clock, Menu as MenuIcon} from '../constant/icons';

import {MainTabParamList} from '../navigation/types';
import colors from '../constant/colors';
import {SvgProps} from 'react-native-svg';

// Defining specific types because
// ButtonTabBarProps is not generic in the library
type StateType = TabNavigationState<MainTabParamList>;
type NavigationType = NavigationHelpers<
  MainTabParamList,
  BottomTabNavigationEventMap
>;

const screenIcons: Record<keyof MainTabParamList, React.FC<SvgProps>> = {
  Home: Home,
  Leave: Calendar,
  Timesheet: Clock,
};

const TabBar = (props: BottomTabBarProps) => {
  const state = props.state as StateType;
  const navigation = props.navigation as NavigationType;

  const tabButtons = state.routes.map((route, index) => {
    const label = route.name;
    const isFocused = state.index === index;

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const Icon = screenIcons[route.name];

    return (
      <TouchableOpacity
        key={route.name}
        style={styles.buttonContainer}
        onPress={onPress}>
        <Icon />
        <Text style={styles.buttonTitle}>{label}</Text>
      </TouchableOpacity>
    );
  });

  const handleMenuButtonPress = () => {
    // TODO
  };

  return (
    <View style={styles.container}>
      {tabButtons}

      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleMenuButtonPress}>
        <MenuIcon />
        <Text style={styles.buttonTitle}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    backgroundColor: colors.SECONDARY_BACKGROUND,

    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: colors.GREY_BORDER_COLOR,

    paddingVertical: 9,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonTitle: {
    color: colors.SECONDARY,
  },
});

export default TabBar;
