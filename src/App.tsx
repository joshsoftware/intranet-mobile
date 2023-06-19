import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from 'react-query';

import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';
import {navigationRef} from './app/navigation';

import colors from './app/constant/colors';

const queryClient = new QueryClient();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.WHITE,
  },
};

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <Interceptor>
          <QueryClientProvider client={queryClient}>
            <StatusBar backgroundColor={colors.PRIMARY} />
            <NavigationContainer theme={theme} ref={navigationRef}>
              <RootNavigator />
            </NavigationContainer>
          </QueryClientProvider>
        </Interceptor>
      </UserContext.Provider>
      <Toast />
    </>
  );
};

export default App;
