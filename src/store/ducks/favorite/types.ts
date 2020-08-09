/**
 * ACTIONS TYPES
 */
export enum FavoriteTypes {
  FAVORITE_ENABLED = 'FAVORITE_ENABLED',
  FAVORITE_DISABLED = 'FAVORITE_DISABLED',
}

/**
 * STATE TYPES
 */
export interface IFavoriteState {
  readonly enabled: boolean;
}
