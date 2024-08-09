import 'react-native-gesture-handler';

import React, {useState,useEffect} from 'react';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import Toast from './app/components/toast';

import {Interceptor} from './app/services/api';
import RootNavigator from './app/navigation/RootNavigator';
import UserContext, {UserContextData} from './app/context/user.context';

import colors from './app/constant/colors';
import VersionContext from './app/context/version.context';
import {CheckVersionResponse} from 'react-native-check-version';

const queryClient = new QueryClient();

const App = () => {
  const userContextValue = useState<UserContextData | null>(null);
  const versionContextValue = useState<CheckVersionResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);


  useEffect(() => {
    // Request permission to receive notifications
    async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
 
 
      if (enabled) {
        console.log('Authorization status:', authStatus);
        getToken();
      }
    }
    const getToken = async () => {
      try {
        let fcmToken = await messaging().getToken();
        if (fcmToken) {
          setToken(fcmToken);
          console.log('Your Firebase Token is:', fcmToken);
        } else {
          console.log('Failed to get token');
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };
 
 
    requestUserPermission();
 
 
    // Handle foreground messages
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage)
    });
 
 
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
    });
 
 
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage);
      }
    });
 
 
    return unsubscribe;
  }, []);
  async function onDisplayNotification(remoteMessage: any) {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
 
  return (
    <>
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
    </>
  );
};

export default App;
