import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.action";

export default function DeletePost({ post }) {
  const dispatch = useDispatch();
  const handleDelete = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/post/${post._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log(data.error);
    } else {
      console.log(data);
      dispatch(deletePost(data));
    }
  };

  return (
    <img onClick={handleDelete} src="../../public/img/icons/trash.svg" alt="" />
  );
}
