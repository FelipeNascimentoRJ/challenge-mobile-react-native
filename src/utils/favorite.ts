// Local Storage
import AsyncStorage from '@react-native-community/async-storage';

export default class Favorite {
  public static async isFavorite(id: number) {
    try {
      return (await AsyncStorage.getItem(`${id}:fav`)) !== null;
    } catch {
      return false;
    }
  }

  public static async setFavorite(id: number) {
    try {
      await AsyncStorage.setItem(`${id}:fav`, `${id}`);
      return true;
    } catch {
      return false;
    }
  }

  public static async delFavorite(id: number) {
    try {
      await AsyncStorage.removeItem(`${id}:fav`);
      return true;
    } catch {
      return false;
    }
  }
}
