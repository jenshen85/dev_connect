import { combineReducers } from 'redux';
import authReduser from './authReduser';

const reducers = {
  auth: authReduser,
};

export default combineReducers(reducers);
