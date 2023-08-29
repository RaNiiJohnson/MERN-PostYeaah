import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import postReducer from "./post.reducer";
import currentUserReducer from "./currentUser.reducer";

export default combineReducers({
  userReducer,
  postReducer,
  currentUserReducer,
});
