import { GET_ERRORS, CLEAR_ERRORS } from '../constants';

const initialState = {};

const errorsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};

export default errorsReduser;
