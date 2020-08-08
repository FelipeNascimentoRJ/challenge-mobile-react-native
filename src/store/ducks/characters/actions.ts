import {CharactersTypes} from './types';
import {ICharacterDataContainer} from '../../../services/marvel/types/characters';

export function charactersRequest(callback?: any, error?: any) {
  return {
    type: CharactersTypes.CHARACTERS_REQUEST,
    payload: {
      error,
      callback,
    },
  };
}

export function charactersRequestSuccess(payload: ICharacterDataContainer) {
  return {
    type: CharactersTypes.CHARACTERS_REQUEST_SUCCESS,
    payload,
  };
}

export function charactersRequestFailure() {
  return {
    type: CharactersTypes.CHARACTERS_REQUEST_FAILURE,
  };
}