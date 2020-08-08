import {AnyAction, Reducer} from 'redux';
import {ICharactersState, CharactersTypes} from './types';
import {ICharacterDataContainer} from '../../../services/marvel/types/characters';

const INITIAL_STATE: ICharactersState = {
  error: false,
  loading: false,
  totalPages: 1,
  currentPage: 0,
  data: null,
};

export const CHAR_PER_PAGE = 20;

const requestState = (state: ICharactersState): ICharactersState => {
  let newState: ICharactersState = state;

  newState = {
    ...state,
    loading: true,
  };

  return newState;
};

const stateSuccess = (
  state: ICharactersState,
  dataContainer: ICharacterDataContainer,
): ICharactersState => {
  const {currentPage, data} = state;
  const {total, results} = dataContainer;

  let newState: ICharactersState = state;

  if (total && results !== undefined) {
    newState = {
      error: false,
      loading: false,
      totalPages: Math.floor(total / CHAR_PER_PAGE),
      currentPage: currentPage + 1,
      data: data !== null ? [...data, ...results] : results,
    };
  }

  return newState;
};

const failureState = (state: ICharactersState): ICharactersState => {
  let newState: ICharactersState = state;

  newState = {
    ...state,
    error: true,
    loading: false,
    data: null,
  };

  return newState;
};

const characters: Reducer<ICharactersState> = (
  state = INITIAL_STATE,
  action: AnyAction,
) => {
  let data: ICharactersState;

  switch (action.type) {
    case CharactersTypes.CHARACTERS_REQUEST:
      data = requestState(state);
      break;
    case CharactersTypes.CHARACTERS_REQUEST_SUCCESS:
      data = stateSuccess(state, action.payload.data);
      break;
    case CharactersTypes.CHARACTERS_REQUEST_FAILURE:
      data = failureState(state);
      break;
    default:
      data = state;
  }

  return data;
};

export default characters;