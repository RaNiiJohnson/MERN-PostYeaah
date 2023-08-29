const Post = require("../Models/post.model");
const User = require("../Models/user.model");
const { ObjectID } = require("bson");

module.exports.getPost = async (req, res) => {
  const stories = await Post.find().sort({ createdAt: -1 });
  res.status(200).json(stories);
};

module.exports.createPost = async (req, res) => {
  const { post } = req.body;

  try {
    const author = req.user.name;
    const posts = await Post.create({ author, post });
    res.status(200).json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.updatePost = async (req, res) => {
  if (ObjectID.isValid(req.params.id) || ObjectID.isValid(req.body.post)) {
    await Post.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $set: {
          post: req.body.post,
        },
      },
      { new: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.deletePost = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    await Post.findOneAndRemove({ _id: ObjectID(req.params.id) })
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.commentPost = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    await Post.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $push: {
          comments: {
            commenterName: req.body.name,
            text: req.body.text,
            timestamp: Date.now(),
          },
        },
      },
      { new: true } // <======<
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.editCommentPost = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    // await Post.findById(
    //   { _id: ObjectID(req.params.id) },
    //   async (err, docs, next) => {
    //     const theComment = await (docs.comments.find((comment) =>
    //       comment._id.equals(req.body.commentId)
    //     ).text = req.body.text);
    //     return docs.save((err) => {
    //       if (!err) return res.status(200).send(docs);
    //       return res.status(500).send(err);
    //     });
    //   }
    // )
    //   .then((docs) => {
    //     res.status(200).json(docs);
    //   })
    //   .catch((err) => {
    //     res.status(docs.status).json({ error: err });
    //   });
    await Post.find(
      {
        _id: ObjectID(req.params.id),
      },
      async (err, docs) => {
        // const theComment = await (docs.comments.find((comment) =>
        //   comment._id.equals(req.body.commentId)
        // ).text = req.body.text);
        // return docs.save((err) => {
        //   if (!err) return res.status(200).send(docs);
        //   return res.status(500).send(err);
        // });
        await docs.findByIdAndUpdate(req.body.commentId, {
          $set: {
            text: req.body.text,
          },
        });
      }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};

module.exports.deleteCommentPost = async (req, res) => {
  if (ObjectID.isValid(req.params.id)) {
    await Post.findByIdAndUpdate(
      { _id: ObjectID(req.params.id) },
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((docs) => {
        res.status(200).json(docs);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  } else {
    return res.status(400).send("ID unknown :" + req.params.id);
  }
};
