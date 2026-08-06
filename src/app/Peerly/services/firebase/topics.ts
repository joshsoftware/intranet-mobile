import Config from 'react-native-config';
import messaging from '@react-native-firebase/messaging';

export const PEERLY_TOPICS = ['peerly', 'peerly-stage', 'peerly-dev'] as const;

/**
 * FCM topic per app environment so stage/dev broadcasts don't reach prod devices.
 * Prod keeps legacy topic "peerly".
 */
export const getPeerlyFcmTopic = (): string => {
  const env = (Config.ENV || '').toLowerCase().trim();

  if (env === 'staging' || env === 'stage') {
    return 'peerly-stage';
  }
  if (env === 'development' || env === 'dev') {
    return 'peerly-dev';
  }
  return 'peerly';
};

export const syncPeerlyFcmTopic = async () => {
  const topic = getPeerlyFcmTopic();

  await Promise.all(
    PEERLY_TOPICS.filter(t => t !== topic).map(async otherTopic => {
      try {
        await messaging().unsubscribeFromTopic(otherTopic);
      } catch {
        // ignore — device may never have been subscribed
      }
    }),
  );

  await messaging().subscribeToTopic(topic);
};
