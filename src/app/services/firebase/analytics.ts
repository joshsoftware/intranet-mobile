import analytics from '@react-native-firebase/analytics';

export const logEvent = async (
  eventName: string,
  eventProperties: object = {},
) => {
  try {
    // console.log('[Analytics Events] ', eventName, eventProperties);
    await analytics().logEvent(eventName, eventProperties);
  } catch (err) {
    //
  }
};
