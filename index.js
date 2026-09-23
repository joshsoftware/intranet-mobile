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
import {syncPeerlyFcmTopic} from './src/app/Peerly/services/firebase/topics';

// When FCM includes a `notification` payload, Android already shows it in the
// system tray. The handler may still run with data-only fields — skip empty
// fallbacks so swiping the real notification does not leave an "Intranet" ghost.
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (remoteMessage.notification) {
    return;
  }

  const title = String(remoteMessage.data?.title ?? '').trim();
  const body = String(
    remoteMessage.data?.body ?? remoteMessage.data?.message ?? '',
  ).trim();

  // No user-visible content — do not post a tray notification
  if (!title && !body) {
    return;
  }

  const channelId = await notifee.createChannel({
    id: 'josh_notifications',
    name: 'Default Channel',
  });

  await notifee.displayNotification({
    title: title || body,
    body: title ? body : '',
    data: remoteMessage.data,
    android: {
      channelId,
      smallIcon: 'ic_stat_josh',
      largeIcon: 'ic_josh_logo',
      pressAction: {id: 'default'},
    },
  });
});
syncPeerlyFcmTopic().catch(() => {});

notifee.onBackgroundEvent(async ({type, detail}) => {
  if (type === EventType.PRESS) {
    await handlePeerlyNotificationOpen(
      normalizeNotificationData(detail.notification?.data),
    );
  }
});

AppRegistry.registerComponent(appName, () => App);
