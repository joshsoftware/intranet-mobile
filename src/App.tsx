import React, {useEffect} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './app/navigation/RootNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
