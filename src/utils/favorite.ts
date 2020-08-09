import Store from './store';

export default class Favorite {
  public static async isFavorite(id: number) {
    return Store.exists(`${id}:fav`);
  }

  public static async setFavorite(id: number) {
    return Store.set(`${id}:fav`, `${id}`);
  }

  public static async delFavorite(id: number) {
    return Store.del(`${id}:fav`);
  }
}
