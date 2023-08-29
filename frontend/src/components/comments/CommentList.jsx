import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../helpers";
import { motion as m } from "framer-motion";
import DeleteComment from "./DeleteComment";

export default function CommentList({ comment, post }) {
  const [editComment, setEditComment] = useState(false);
  const currentUser = useSelector((state) => state.currentUserReducer);
  return (
    <m.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="comment-item">
        <div className="coms">
          {" "}
          <h3>{comment.commenterName} : </h3>
          {!editComment ? (
            <span>{comment.text}</span>
          ) : (
            <>
              {" "}
              <textarea
                name=""
                id=""
                cols="30"
                rows="1"
                required
                autoFocus={true}
                defaultValue={comment.text}
              ></textarea>{" "}
              <div className="button">
                {" "}
                <button onClick={(e) => setEditComment(!editComment)}>
                  annuler
                </button>
                <button onClick={(e) => setEditComment(!editComment)}>
                  modifier
                </button>
              </div>
            </>
          )}
        </div>
        {!isEmpty(currentUser) && currentUser.name === post.author ? (
          <div>
            <img
              onClick={(e) => setEditComment(!editComment)}
              src="../../public/img/icons/edit.svg"
              alt=""
            />
            <DeleteComment post={post} comment={comment} />
          </div>
        ) : (
          ""
        )}
      </div>
    </m.div>
  );
}
