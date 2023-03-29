import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStore {
  static AUTH_TOKEN_KEY = 'authToken';

  static setAuthToken = async (token: string) => {
    await AsyncStorage.setItem(AsyncStore.AUTH_TOKEN_KEY, token);
  };

  static getAuthToken = async () => {
    return await AsyncStorage.getItem(AsyncStore.AUTH_TOKEN_KEY);
  };
}

export default AsyncStore;
