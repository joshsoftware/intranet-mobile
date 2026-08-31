import messaging from '@react-native-firebase/messaging';

export const getNotificationToken = async (): Promise<string> => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    return token || '';
  } catch {
    return '';
  }
};
