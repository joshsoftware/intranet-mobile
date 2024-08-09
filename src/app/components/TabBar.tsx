import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationHelpers, TabNavigationState} from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationEventMap,
} from '@react-navigation/bottom-tabs';
import {SvgProps} from 'react-native-svg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TabBarButton from './button/TabBarButton';
import {useIsKeyboardShown} from '../hooks/useIsKeyboardShown';

import {Home, Calendar, Clock, Menu as MenuIcon} from '../constant/icons';
import {MainTabParamList} from '../navigation/types';
import colors from '../constant/colors';
import {PeerlyIcon} from '../Peerly/constants/icons';

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
  Peerly: PeerlyIcon,
};

const TabBar = (props: BottomTabBarProps) => {
  const {isKeyboardShown} = useIsKeyboardShown();
  const inset = useSafeAreaInsets();

  const state = props.state as StateType;
  const navigation = props.navigation as NavigationType;
  const descriptors = props.descriptors;

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const {tabBarHideOnKeyboard = false} = focusedOptions;
  const tabBarHidden = tabBarHideOnKeyboard && isKeyboardShown;

  if (tabBarHidden) {
    return null;
  }

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
      <TabBarButton
        key={route.name}
        icon={Icon}
        title={label}
        active={isFocused}
        onPress={onPress}
      />
    );
  });

  return (
    <View style={[styles.container, {paddingBottom: inset.bottom}]}>
      <View style={styles.contentContainer}>{tabButtons}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBFE',
    elevation: 10,
    shadowColor: colors.SECONDARY,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  contentContainer: {
    height: 64,
    flexDirection: 'row',
    borderColor: colors.GREY_BORDER_COLOR,
    borderBottomWidth: 0,
  },
});

export default TabBar;
