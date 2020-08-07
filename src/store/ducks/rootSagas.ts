import {all, takeLatest} from 'redux-saga/effects';

import {CharactersTypes} from './characters/types';
import {charactersRequest} from './characters/sagas';

export default function* root() {
  yield all([
    takeLatest(CharactersTypes.CHARACTERS_REQUEST, charactersRequest),
  ]);
}
