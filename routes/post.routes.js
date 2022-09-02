/**
 * Recordamos que al utilizar `res.render` RENDERIZAMOS los view hbs.
 * Para ello tenemos que decir el nombre del archivo y NUNCA empezará por `/`
 */

/**
 * Al utilizar el método `res.redirect` REALIZAMOS una llamada GET a otra ruta.
 * Para ello tenemos que decir a que ruta queremos ir y SIEMPRE empezará por `/`
 */

const router = require('express').Router();
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');

router.get('/create/:userId', (req, res, next) => {
  UserModel.findById(req.params.userId)
    .then((user) => {
      res.render('user/create_post', user);
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

router.get('/:postId', (req, res, next) => {
  PostModel.findById(req.params.postId)
    // Realizamos un populate para que mongoose cambie el _id de author por el dueño del id de la colección de user
    .populate('author', 'username email -_id')
    /**
     *  En el modelo de `Post` tenemos una propiedad que es un array de ids del modelo `Comment`
     *  y a su vez este último modelo tienen una propiedad `user` el cual es el autor del comentario.
     *  Como necesitamos ambos valores lo que tenemos que realizar es un populate de un populate.
     *  Para ello utilizamos: { path: 'comments', populate: { path: 'user'}}
     *  Lo que quiere decir es que popule el campo `comments`
     *  y dentro de ese modelo se encuentra la propiedad `user` y le decimos que también lo popule.
     */
    .populate({ path: 'comments', populate: { path: 'user' } })
    .then((post) => {
      console.log(post);
      // console.log(JSON.stringify(post));
      res.render('post/view_post', post);
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

router.post('/', (req, res, next) => {
  // Realizamos el destructuring para solo seleccionar los campos que queremos.
  const { title, description, user } = req.body;
  PostModel.create({ title, description, author: user })
    .then((post) => {
      res.redirect(`/post/${post._id}`);
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

module.exports = router;
