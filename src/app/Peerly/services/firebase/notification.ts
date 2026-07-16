import {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {PermissionsAndroid, Platform} from 'react-native';

const DEFAULT_CHANNEL_ID = 'default-channel';

const usePushNotification = () => {
  const [token, setToken] = useState<string | null>(null);

  // Initialize default notification channel
  const initializeDefaultChannel = async () => {
    const channels = await notifee.getChannels();
    const defaultChannelExists = channels.some(
      channel => channel.id === DEFAULT_CHANNEL_ID,
    );

    if (!defaultChannelExists) {
      await notifee.createChannel({
        id: DEFAULT_CHANNEL_ID,
        name: 'Default Channel',
      });
    }
  };

  // Handle Background notification
  useEffect(() => {
    initializeDefaultChannel();
    const unsubscribe = messaging().onNotificationOpenedApp(async () => {});
    return unsubscribe;
  }, []);

  // Register for remote messages and get the Notification token
  const getNotificationToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      setToken(fcmToken);
    }
  };

  const getInitialNotification = () => {
    return messaging().getInitialNotification();
  };
  // Handler to display notifications when the app is in the foreground
  const onDisplayNotification = async (message: any) => {
    await notifee.displayNotification({
      title: message.notification?.title || 'No Title',
      body: message.notification?.body || 'No Body',
      android: {channelId: DEFAULT_CHANNEL_ID},
    });
  };

  const requestUserPermission = () => {
    return messaging().requestPermission();
  };

  const listenToForegroundNotifications = () => {
    return messaging().onMessage(async remoteMessage => {
      await onDisplayNotification(remoteMessage);
    });
  };

  const listenToBackgroundNotifications = () => {
    return messaging().setBackgroundMessageHandler(async () => {});
  };

  const subscribeToTopic = async () => {
    messaging().subscribeToTopic('peerly');
  };

  return {
    subscribeToTopic,
    getInitialNotification,
    getNotificationToken,
    listenToForegroundNotifications,
    requestUserPermission,
    listenToBackgroundNotifications,
  };
};

export default usePushNotification;
