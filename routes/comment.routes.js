/**
 * Al utilizar el método `res.redirect` REALIZAMOS una llamada GET a otra ruta.
 * Para ello tenemos que decir a que ruta queremos ir y SIEMPRE empezará por `/`
 */

const router = require('express').Router();
const CommentModel = require('../models/comment.model');
const PostModel = require('../models/post.model');

router.post('/', (req, res, next) => {
  // Realizamos el destructuring para solo seleccionar los campos que queremos.
  const { user, comment, post } = req.body;
  CommentModel.create({ user, comment, post })
    .then((newComment) => {
      return PostModel.updateOne(
        { _id: post },
        /**
         * en el modelo de Post tiene una propiedad que es un array, el cual es `commnets`
         * para poder añadir una nueva propiedad al array tenemos que utilizar la sintaxis $push
         */
        { $push: { comments: newComment._id } }
      );
    })
    .then(() => {
      res.redirect(`/post/${post}`);
    })
    // Utilizamos el next(err) para controlar el error
    .catch((err) => next(err));
});

module.exports = router;
