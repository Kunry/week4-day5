const router = require('express').Router();
const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');

router.post('/', (req, res, next) => {
  const { user, comment, post } = req.body;
  CommentModel.create({ user, comment, post })
    .then((newComment) => {
      return PostModel.updateOne(
        { _id: post },
        { $push: { comments: newComment._id } }
      );
    })
    .then(() => {
      res.redirect(`/post/${post}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
