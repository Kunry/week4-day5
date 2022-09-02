const router = require("express").Router();
const UserModel = require('../models/user.model');

/* GET home page */
router.get("/", (_req, res) => {
  res.render("index");
});

router.get('/signup', (_req, res) => {
  res.render('signup');
})

router.post('/signup', (req, res, next) => {
  console.log(req.body);
  // const username = req.body.username;
  // const email = req.body.email;
  // const password = req.body.password;
  const { name, email, password } = req.body;
  console.log({ name, email, password });
  UserModel.create({ username: name, email, password })
  .then((user) => {
    res.redirect(`/user/${user._id}`)
  })
  .catch((err) => {
    next(err);
  })
})

module.exports = router;
