import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import Toast from './app/components/toast';

import { Interceptor } from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, { UserContextData } from './app/context/user.context';

import colors from './app/constant/colors';
import VersionContext from './app/context/version.context';
import { CheckVersionResponse } from 'react-native-check-version';

import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import ErrorBoundary from './app/components/ErrorBoundary';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);
  const versionContextValue = useState<CheckVersionResponse | null>(null);

  useEffect(() => {
    // Request permission to receive notifications
    async function requestUserPermission() {
      await messaging().requestPermission();
    }

    async function onDisplayNotification(remoteMessage: any) {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
      });
    }

    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });

    // called if the app has opened from a background state.
    messaging().onNotificationOpenedApp(() => { });

    //triggered when application open from a quit state
    messaging().getInitialNotification();

    return unsubscribe;
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <VersionContext.Provider value={versionContextValue}>
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
        </VersionContext.Provider>
        <Toast />
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

export default App;
