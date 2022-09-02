/**
 * Recordamos que al utilizar `res.render` RENDERIZAMOS los view hbs.
 * Para ello tenemos que decir el nombre del archivo y NUNCA empezará por `/`
 */

/**
 * Al utilizar el método `res.redirect` REALIZAMOS una llamada GET a otra ruta.
 * Para ello tenemos que decir a que ruta queremos ir y SIEMPRE empezará por `/`
 */

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
    // Utilizamos el next(err) para controlar el error
    .catch((err) => {
      next(err);
    });
});

router.get('/delete/:idUser', (req, res, next) => {
  UserModel.findByIdAndDelete(req.params.idUser)
    .then(() => {
      res.redirect('/');
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

router.post('/:userId', (req, res, next) => {
  // Realizamos el destructuring para solo seleccionar los campos que queremos.
  const { username, email } = req.body;
  UserModel.findByIdAndUpdate(req.params.userId, { username, email })
    .then((user) => {
      res.redirect(`/user/${user._id}`);
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

module.exports = router;
