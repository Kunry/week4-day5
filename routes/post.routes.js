const router = require('express').Router();
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');

router.get('/create/:userId', (req, res, next) => {
  UserModel.findById(req.params.userId)
  .then(user => {
    res.render('user/create_post', user)
  })
})

router.get('/:postId', (req, res, next) => {
  PostModel.findById(req.params.postId)
  .populate('author', 'username email -_id')
  .populate({ path: 'comments', populate: { path: 'user'}})
  .then(post => {
    console.log(post);
    // console.log(JSON.stringify(post));
    res.render('post/view_post', post);
  })
})

router.post('/', (req, res, next) => {
  const { title, description, user } = req.body;
  PostModel.create({ title, description, author: user })
  .then((post) => {
    res.redirect('/');
  })
  .catch(err => next(err))
})

module.exports = router;