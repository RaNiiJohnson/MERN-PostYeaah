import {
  GET_USER,
  LOGIN,
  SIGNUP,
  UPLOAD_PICTURE,
} from "../actions/user.action";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case LOGIN:
      return action.payload;
    case SIGNUP:
      return action.payload;
    case UPLOAD_PICTURE:
      return state.map((user) => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else
          return {
            ...user,
          };
      });
    default:
      return state;
  }
}
