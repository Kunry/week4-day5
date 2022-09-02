const router = require('express').Router();
const UserModel = require('../models/user.model');

router.get('/:userId', (req, res, next) => {
  console.log(req.params);
  UserModel.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.render('user/user_id', user);
      } else {
        res.render('not-found');
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/delete/:idUser', (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.idUser)
  .then(() => {
    res.redirect('/');
  })
  .catch(err => next(err));
});

router.post('/:userId', (req, res, next) => {
  const { username, email } = req.body;
  UserModel.findByIdAndUpdate(req.params.userId, { username, email })
    .then((user) => {
      res.redirect(`/user/${user._id}`);
    })
    .catch((err) => next(err));
});


module.exports = router;
