import { combineReducers } from 'redux';
import translateReducer from './locale';

export default combineReducers({
  translate: translateReducer,
});
