import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';

import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';

import colors from './app/constant/colors';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);

  return (
    <>
      <UserContext.Provider value={userContextValue}>
        <Interceptor>
          <QueryClientProvider client={queryClient}>
            <StatusBar
              backgroundColor={colors.PRIMARY}
              barStyle="light-content"
            />
            <RootNavigator />
          </QueryClientProvider>
        </Interceptor>
      </UserContext.Provider>
      <Toast />
    </>
  );
};

export default App;
