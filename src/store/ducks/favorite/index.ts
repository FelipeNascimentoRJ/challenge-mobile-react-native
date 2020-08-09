import {Reducer, AnyAction} from 'redux';

import {FavoriteTypes, IFavoriteState} from './types';

const INITIAL_STATE: IFavoriteState = {
  enabled: false,
};

const favorite: Reducer<IFavoriteState> = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  if (action.type === FavoriteTypes.FAVORITE_ENABLED) {
    return {enabled: true};
  }

  if (action.type === FavoriteTypes.FAVORITE_DISABLED) {
    return {enabled: false};
  }

  return state;
};

export default favorite;
