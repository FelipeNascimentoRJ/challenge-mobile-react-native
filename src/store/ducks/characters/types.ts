import {ICharacter} from '../../../services/marvel/types/characters';

/**
 * ACTIONS TYPES
 */
export enum CharactersTypes {
  CHARACTERS_REQUEST = 'CHARACTERS_REQUEST',
  CHARACTERS_REQUEST_SUCCESS = 'CHARACTERS_REQUEST_SUCCESS',
  CHARACTERS_REQUEST_FAILURE = 'CHARACTERS_REQUEST_FAILURE',
}

/**
 * STATE TYPES
 */
export interface ICharactersState {
  readonly error: boolean;
  readonly loading: boolean;
  readonly totalPages: number;
  readonly currentPage: number;
  readonly data: Array<ICharacter> | null;
}