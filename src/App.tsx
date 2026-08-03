import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';

import colors from './app/constant/colors';
import VersionContext from './app/context/version.context';
import {CheckVersionResponse} from 'react-native-check-version';

import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import ErrorBoundary from './app/components/ErrorBoundary';
import {
  handlePeerlyNotificationOpen,
  handleRemoteMessageOpen,
  normalizeNotificationData,
} from './app/Peerly/services/firebase/notificationNavigation';

const queryClient = new QueryClient();
const DEFAULT_CHANNEL_ID = 'default';

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);
  const versionContextValue = useState<CheckVersionResponse | null>(null);

  useEffect(() => {
    async function requestUserPermission() {
      await messaging().requestPermission();
      await notifee.requestPermission();
    }

    async function onDisplayNotification(remoteMessage: any) {
      const channelId = await notifee.createChannel({
        id: DEFAULT_CHANNEL_ID,
        name: 'Default Channel',
      });

      await notifee.displayNotification({
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: normalizeNotificationData(remoteMessage.data),
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

    const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
      onDisplayNotification(remoteMessage);
    });

    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      remoteMessage => {
        handleRemoteMessageOpen(remoteMessage);
      },
    );

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        handleRemoteMessageOpen(remoteMessage);
      });

    const unsubscribeNotifee = notifee.onForegroundEvent(({type, detail}) => {
      if (type === EventType.PRESS) {
        handlePeerlyNotificationOpen(
          normalizeNotificationData(detail.notification?.data as any),
        );
      }
    });

    return () => {
      unsubscribeForeground();
      unsubscribeOpened();
      unsubscribeNotifee();
    };
  }, []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{flex: 1}}>
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
