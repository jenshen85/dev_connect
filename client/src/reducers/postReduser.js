// import {
// POST_LOADING,
// GET_POSTS,
// GET_POST,
// ADD_POST,
// DELETE_POST,
// } from '../constants';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

const postReduser = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default postReduser;
