import {FavoriteTypes} from './types';

export function favoriteEnabled() {
  return {
    type: FavoriteTypes.FAVORITE_ENABLED,
  };
}

export function favoriteDisabled() {
  return {
    type: FavoriteTypes.FAVORITE_DISABLED,
  };
}
