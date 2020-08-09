import AsyncStorage from '@react-native-community/async-storage';

export default class Store {
  public static async exists(key: string) {
    try {
      return (await AsyncStorage.getItem(key)) !== null;
    } catch {
      return false;
    }
  }

  public static async set(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  public static async get(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }

  public static async del(key: string) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  }
}
