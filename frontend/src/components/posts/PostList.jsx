import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../helpers";
import CommentList from "../comments/CommentList";
import DeletePost from "./DeletePost";
import { AnimatePresence, motion as m } from "framer-motion";
import CommentPost from "../comments/CommentPost";
import EditPost from "./EditPost";

export default function PostList({ post }) {
  const [editPost, setEditPost] = useState(false);
  const currentUser = useSelector((state) => state.currentUserReducer);

  return (
    <m.form
      className="post-item"
      initial={{ opacity: 0, y: -100, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{
        duration: "0.3",
      }}
    >
      <div className="header-item">
        <div className="pseudo">
          <span>{[post.author].map((w) => w[0].toUpperCase())}</span>
          <h2>{post.author}</h2>
        </div>
        {currentUser && currentUser.name === post.author ? (
          <div>
            <img
              onClick={(e) => setEditPost(!editPost)}
              src="../../public/img/icons/edit.svg"
              alt=""
            />
            <DeletePost post={post} />
          </div>
        ) : (
          ""
        )}
      </div>
      {!editPost ? (
        <p>{post.post}</p>
      ) : (
        <EditPost editPost={editPost} setEditPost={setEditPost} postt={post} />
      )}
      <div className="comment-list">
        <h4>Commentaire(s)</h4>
        <AnimatePresence>
          {!isEmpty(post.comments) ? (
            post.comments
              .map((comment, index) => (
                <CommentList post={post} comment={comment} key={index} />
              ))
              .sort()
          ) : (
            <>
              {" "}
              <div className="comment-item no-coms">
                Pas de commentaire pour le moment
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
      {currentUser ? <CommentPost post={post} /> : <></>}
    </m.form>
  );
}
