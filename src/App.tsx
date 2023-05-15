import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import RootNavigator from './app/navigation/RootNavigator';

import UserContext, {UserContextData} from './app/context/user.context';
import {navigationRef} from './app/navigation';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);

  return (
    <UserContext.Provider value={userContextValue}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default App;
