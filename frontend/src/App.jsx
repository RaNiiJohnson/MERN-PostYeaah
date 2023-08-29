import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { isEmpty } from "./helpers";
import PostList from "./components/posts/PostList";
import { useState } from "react";

export default function App() {
  const [anim, setAnim] = useState(false);
  const location = useLocation();
  const posts = useSelector((state) => state.postReducer);
  const currentUser = useSelector((state) => state.currentUserReducer);

  return (
    <>
      <Nav />
      <div
        className={anim ? "home home-anim" : "home"}
        id={currentUser ? "" : "noUser"}
      >
        <AnimatePresence initial={false} mode="wait">
          <Routes location={location} key={location.key}>
            <Route
              path="/"
              element={
                currentUser ? (
                  <Home anim={anim} setAnim={setAnim} />
                ) : (
                  <Navigate to="/signin" />
                )
              }
            />
            <Route
              path="/signup"
              element={!currentUser ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/signin"
              element={!currentUser ? <SignIn /> : <Navigate to="/" />}
            />
          </Routes>
        </AnimatePresence>
      </div>{" "}
      <div
        className={anim ? "post-list post-list-anim" : "post-list"}
        id={currentUser ? "" : "noUser"}
      >
        <AnimatePresence>
          {!isEmpty(posts) &&
            Array.isArray(posts) &&
            posts.map((post) => <PostList key={post._id} post={post} />)}
        </AnimatePresence>
      </div>
    </>
  );
}
