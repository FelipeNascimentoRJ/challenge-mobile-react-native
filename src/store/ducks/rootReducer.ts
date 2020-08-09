import {combineReducers} from 'redux';

import characters from './characters';
import favorite from './favorite';

export default combineReducers({
  characters,
  favorite,
});
