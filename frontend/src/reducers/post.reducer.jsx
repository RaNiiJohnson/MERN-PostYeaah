import {
  ADD_POST,
  COMMENT_POST,
  DELETE_COMMENT,
  DELETE_POST,
  EDIT_POST,
  GET_POST,
} from "../actions/post.action";

const initialState = {};

export default function storyReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST:
      return action.payload;
    case ADD_POST:
      return [action.payload, ...state];
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload._id);
    case EDIT_POST:
      return state.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            post: action.payload.post,
          };
        } else {
          return { ...post };
        }
      });
    case COMMENT_POST:
      return state.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            comments: [...action.payload.comments],
          };
        } else {
          return { ...post };
        }
      });
    case DELETE_COMMENT: {
      return state.map((post) => {
        if (post._id === action.payload._id) {
          return {
            ...post,
            comments: [...action.payload.comments].filter(
              (comment) => comment._id !== action.payload.comments._id
            ),
          };
        } else {
          return { ...post };
        }
      });
    }
    default:
      return state;
  }
}
