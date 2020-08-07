import {call, put, select} from 'redux-saga/effects';

// Types
import {IApplicationState} from '../..';

// API Marvel
import config from '../../../../marvel.config.json';
import Marvel from '../../../services/marvel';

// Types
import {
  ICharacterParameters,
  ICharacterDataContainer,
} from '../../../services/marvel/types/characters';

// Actions
import {charactersRequestSuccess, charactersRequestFailure} from './actions';

// Characters per page
import {CHAR_PER_PAGE} from './index';

// Saga
export function* charactersRequest() {
  // Current States
  const {totalPages, currentPage} = yield select(
    (state: IApplicationState) => state.characters,
  );

  if (currentPage >= totalPages) {
    return;
  }

  try {
    // Instance
    const marvel = yield new Marvel(config.privateKey, config.publicKey);

    const offset: number = yield currentPage === 0
      ? currentPage
      : CHAR_PER_PAGE * currentPage;

    // Request params
    const params: ICharacterParameters = yield {
      orderBy: 'name',
      offset,
      limit: CHAR_PER_PAGE,
    };

    // Send Request
    const response = yield call([marvel, 'getCharacters'], params);

    // Extract Data
    const data: ICharacterDataContainer = yield response.data;

    yield put(charactersRequestSuccess(data));
  } catch (err) {
    yield put(charactersRequestFailure());
  }
}
