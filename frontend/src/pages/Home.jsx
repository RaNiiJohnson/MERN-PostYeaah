import React, { useState } from "react";
import { motion as m } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../actions/post.action";
import { useRef } from "react";

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "100vw",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      mass: 0.4,
      damping: 8,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

export default function Home({ anim, setAnim }) {
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [post, setPost] = useState("");
  const dispatch = useDispatch();
  const ref = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/post/", {
      method: "POST",
      body: JSON.stringify({ post }),
      withCredentials: true,
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.error);
    } else {
      console.log(data);
      dispatch(addPost(data));
      ref.current.value = "";
    }
  };

  return (
    <m.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form className="homeForm" onSubmit={handleSubmit}>
        <section>
          <span>{currentUser.name.split("")[0].toUpperCase()}</span>
          <h2>{currentUser.name}</h2>
          <img
            onClick={() => setAnim(!anim)}
            src="../../public/img/icons/rocket.svg"
            alt=""
          />
        </section>

        <textarea
          ref={ref}
          placeholder="Poster quelque chose..."
          name=""
          id=""
          cols="40"
          rows="4"
          onChange={(e) => setPost(e.target.value)}
          required
        ></textarea>
        <input type="submit" value="Poster" />
      </form>
    </m.div>
  );
}
