import { ADD_POST, POST_LOADING, GET_POSTS } from '../constants';

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

const postReduser = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default postReduser;
