import messaging from '@react-native-firebase/messaging';

export const getNotificationToken = () => {
  return messaging().getToken();
};
