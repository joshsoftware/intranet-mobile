import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import RootNavigator from './app/navigation/RootNavigator';
import {QueryClient, QueryClientProvider} from 'react-query';
import UserContext, {UserData} from './app/context/user.context';

const queryClient = new QueryClient();

const App = () => {
  const user = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={user}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContext.Provider>
  );
};

export default App;
