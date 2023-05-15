import React from 'react';
import {
  CommonActions,
  DrawerActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = React.createRef<NavigationContainerRef<{}>>();

// helps to navigate between screens
export const navigate = (name: string, params?: any) => {
  navigationRef.current?.dispatch(
    CommonActions.navigate({
      key: `name-${Date.now()}`,
      name,
      params,
    }),
  );
};

// helps to go back to the previous screen
export const goBack = () => {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current.goBack();
  }
};

// helps to replace screen
export const replace = (name: string, params?: any) =>
  navigationRef.current?.dispatch(StackActions.replace(name, params));

// helps to toggle drawer
export const toggleDrawer = () =>
  navigationRef.current?.dispatch(DrawerActions.toggleDrawer());

// helps to get parameters
export const getParams = () => navigationRef.current?.getCurrentRoute()?.params;
