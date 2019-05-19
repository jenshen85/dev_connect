import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from '../constants';

// Add post
export const addPost = (postData) => (dispatch) => {
  axios
    .post('/api/posts', postData)
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

// Get posts
export const getPosts = () => (dispatch) => {
  dispatch(setPostLoading);
  axios
    .get('/api/posts')
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null,
      })
    );
};

// Get post
export const getPost = (postId) => (dispatch) => {
  dispatch(setPostLoading);
  axios
    .get(`/api/posts/${postId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POST,
        payload: null,
      })
    );
};

// Delete posts
export const deletePost = (PostId) => (dispatch) => {
  dispatch(setPostLoading);
  axios
    .delete(`/api/posts/${PostId}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: PostId,
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

// Add Like
export const addLike = (PostId) => (dispatch) => {
  dispatch(setPostLoading);
  axios
    .post(`/api/posts/like/${PostId}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

// Remove Like
export const removeLike = (PostId) => (dispatch) => {
  dispatch(setPostLoading);
  axios
    .post(`/api/posts/unlike/${PostId}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: null,
      })
    );
};

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};
