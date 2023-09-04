import * as React from 'react';
import {
  DrawerNavigationOptions,
  createDrawerNavigator,
} from '@react-navigation/drawer';

import MainNavigator from './MainNavigator';
import DrawerContent from '../components/DrawerContent';

import colors from '../constant/colors';
import {MAIN_SCREEN} from '../constant/screenNames';

const Drawer = createDrawerNavigator();

const screenOptions: DrawerNavigationOptions = {
  headerShown: false,
  swipeEnabled: false,
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

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      // useLegacyImplementation
      initialRouteName={MAIN_SCREEN}
      screenOptions={screenOptions}
      drawerContent={renderDrawerContent}>
      <Drawer.Screen name={MAIN_SCREEN} component={MainNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
