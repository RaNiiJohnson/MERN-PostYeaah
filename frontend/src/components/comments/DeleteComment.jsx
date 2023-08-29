import React from "react";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../actions/post.action";

export default function DeleteComment({ post, comment }) {
  const dispatch = useDispatch();
  let commentId = comment._id;

  const handleDelete = async (e) => {
    const res = await fetch(
      `http://localhost:5000/post/delete-comment-post/${post._id}`,
      {
        method: "PATCH",
        body: JSON.stringify({ commentId }),
        withCredentials: true,
        headers: { "content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      console.log(data);
      dispatch(deleteComment(data));
    }
  };

  return (
    <img onClick={handleDelete} src="../../public/img/icons/trash.svg" alt="" />
  );
}
