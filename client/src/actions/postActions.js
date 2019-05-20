import axios from 'axios';
import {
  ADD_POST,
  GET_ERRORS,
  GET_POSTS,
  GET_POST,
  POST_LOADING,
  DELETE_POST,
  CLEAR_ERRORS,
} from '../constants';

// Add post
export const addPost = (postData) => (dispatch) => {
  dispatch(clearErrors());

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
  dispatch(setPostLoading());
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
  dispatch(setPostLoading());
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
  dispatch(setPostLoading());
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
  dispatch(setPostLoading());
  axios
    .post(`/api/posts/like/${PostId}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};

// Remove Like
export const removeLike = (PostId) => (dispatch) => {
  dispatch(setPostLoading());
  axios
    .post(`/api/posts/unlike/${PostId}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: {},
      })
    );
};

// Add Comment
export const addComment = (postId, newComment) => (dispatch) => {
  dispatch(clearErrors());
  axios
    .post(`/api/posts/comment/${postId}`, newComment)
    .then((res) =>
      dispatch({
        type: GET_POST,
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

// Delete Comment
export const deleteComment = (postId, commentId) => (dispatch) => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then((res) =>
      dispatch({
        type: GET_POST,
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

// Set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING,
  };
};

// clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
