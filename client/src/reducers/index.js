import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

const reducers = {
  auth: authReducer,
  errors: errorsReducer,
};

export default combineReducers(reducers);
