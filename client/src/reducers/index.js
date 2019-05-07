import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profileReduser from './profileReduser';

const reducers = {
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReduser,
};

export default combineReducers(reducers);
