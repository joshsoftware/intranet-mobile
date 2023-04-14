import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import RootNavigator from './app/navigation/RootNavigator';

import GlobalContext, {GlobalContextData} from './app/context/global.context';

const queryClient = new QueryClient();

const App = () => {
  const globalContextValue = useState<GlobalContextData | null>(null);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GlobalContext.Provider>
  );
};

export default App;
