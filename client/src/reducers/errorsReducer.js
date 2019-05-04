import { GET_ERRORS } from '../constants';

const initialState = {};

const errorsReduser = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
};

export default errorsReduser;
