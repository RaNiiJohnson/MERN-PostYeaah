const postController = require("../controllers/post.controller");
const requireAuth = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get("/", postController.getPost);
router.post("/", requireAuth, postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

//commentaire
router.patch("/comment-post/:id", postController.commentPost);
router.patch(
  "/edit-comment-post/:id",
  requireAuth,
  postController.editCommentPost
);
router.patch("/delete-comment-post/:id", postController.deleteCommentPost);

module.exports = router;
