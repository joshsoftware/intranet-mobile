import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './app/navigation/RootNavigator';
import CustomTabView from './app/screens/userProfile/customTabView';

const App = () => {
  return (
    // <NavigationContainer>
    //   <RootNavigator />
    // </NavigationContainer>
    <CustomTabView />
  );
};

export default App;
