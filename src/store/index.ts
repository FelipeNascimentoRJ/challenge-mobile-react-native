import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSagas';

// Types
import {ICharactersState} from './ducks/characters/types';
import {IFavoriteState} from './ducks/favorite/types';

export interface IApplicationState {
  characters: ICharactersState;
  favorite: IFavoriteState;
}

// SagaMiddleware
const sagaMiddleware = createSagaMiddleware();

const store: Store<IApplicationState> = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);

// Executa os sagas
sagaMiddleware.run(rootSaga);

export default store;
