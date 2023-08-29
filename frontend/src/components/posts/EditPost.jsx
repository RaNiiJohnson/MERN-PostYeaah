import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postEdit } from "../../actions/post.action";

export default function EditPost({ editPost, setEditPost, postt }) {
  const [post, setPost] = useState("");
  const dispatch = useDispatch();

  const handelEdit = async () => {
    const res = await fetch(`http://localhost:5000/post/${postt._id}`, {
      method: "PUT",
      body: JSON.stringify({ post }),
      withCredentials: true,
      headers: { "content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      console.log(data);
      dispatch(postEdit(data));
      setEditPost(!editPost);
    }
  };
  return (
    <>
      <textarea
        autoFocus={true}
        defaultValue={postt.post}
        onChange={(e) => setPost(e.target.value)}
        name=""
        id=""
        cols="30"
        rows="4"
        required
      ></textarea>
      <div className="button">
        {" "}
        <span className="button" onClick={() => setEditPost(!editPost)}>
          annuler
        </span>
        <span className="button" onClick={handelEdit}>
          modifier
        </span>
      </div>
    </>
  );
}
