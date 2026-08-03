/**
 * @format
 */

import 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
enableScreens(false);
import './src/app/navigation/reanimatedPolyfill';

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {
  handlePeerlyNotificationOpen,
  normalizeNotificationData,
} from './src/app/Peerly/services/firebase/notificationNavigation';

// Register background handler
messaging().setBackgroundMessageHandler(async () => {});
messaging().subscribeToTopic('peerly');

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    await handlePeerlyNotificationOpen(
      normalizeNotificationData(detail.notification?.data),
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
