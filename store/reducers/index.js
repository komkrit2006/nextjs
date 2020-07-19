import { combineReducers } from 'redux';
import translateReducer from './translateReducer';

export default combineReducers({
  translate: translateReducer,
});
