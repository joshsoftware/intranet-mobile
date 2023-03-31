import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './app/navigation/RootNavigator';
import CustomTabView from './app/navigation/customTabView';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
