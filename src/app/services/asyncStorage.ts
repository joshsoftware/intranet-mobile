import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStore {
  static AUTH_TOKEN_KEY = 'authToken';
  static USER_DATA = 'user_data';
  static APPLE_USER_EMAIL_ID = 'appleUserEmailId';
  static DAILY_QUIZ_COMPLETED_KEY = 'daily_quiz_completed';

  static setItem = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
  };

  static getItem = async (key: string) => {
    return await AsyncStorage.getItem(key);
  };

  static removeItem = async (key: string) => {
    return await AsyncStorage.removeItem(key);
  };
}

export default AsyncStore;
