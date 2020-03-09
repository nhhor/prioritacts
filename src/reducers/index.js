import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';
import tokenReducer from './tokenReducer';

export default combineReducers({
 contactsReducer,
 tokenReducer
});
