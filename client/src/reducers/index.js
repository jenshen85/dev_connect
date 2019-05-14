import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReduser from './profileReduser';
import postReduser from './postReduser';

const reducers = {
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReduser,
  post: postReduser,
};

export default combineReducers(reducers);
