import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../actions/post.action";

export default function CommentPost({ post }) {
  const ref = useRef();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const currentUser = useSelector((state) => state.currentUserReducer);
  let name = currentUser.name;

  const handleSend = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `http://localhost:5000/post/comment-post/${post._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ name, text }),
        withCredentials: true,
        headers: { "content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      console.log(data);
      dispatch(commentPost(data));
      ref.current.value = "";
    }
  };
  return (
    <>
      <textarea
        ref={ref}
        className="textarea"
        cols="30"
        rows="2"
        placeholder="votre commentaire"
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
      <img
        onClick={handleSend}
        className="send"
        src="../../public/img/icons/send.svg"
        alt=""
      />
    </>
  );
}
