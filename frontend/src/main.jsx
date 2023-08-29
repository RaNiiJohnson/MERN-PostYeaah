import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

import { BrowserRouter } from "react-router-dom";
import { getUser } from "./actions/user.action";
import { getPost } from "./actions/post.action";
import { getCurrentUser } from "./actions/currentUser.action";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getPost());
store.dispatch(getUser());
store.dispatch(getCurrentUser());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
