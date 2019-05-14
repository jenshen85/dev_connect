import axios from 'axios';
import { ADD_POST, GET_ERRORS } from '../constants';

// Add post
export const addPost = (postData) => (dispatch) => {
  axios
    .get('/api/posts', postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
