import {applyMiddleware, createStore, Store} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './ducks/rootReducer';
import rootSaga from './ducks/rootSagas';

// Types
import {ICharactersState} from './ducks/characters/types';

export interface IApplicationState {
  characters: ICharactersState;
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
