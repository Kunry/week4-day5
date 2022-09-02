const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    /**
     * Para poder introducir campos como _id tendremos que escribir:
     * Schema.Types.ObjectId
     * 
     * Para hacer la referencia es obligatorio escribir la propiedad ref y que su valor
     * sea exacatamente igual al nombre que tiene el modelo al cual queremos 
     * referenciar. Para ello tendremos que ir al archivo donde inicializamos el modelo y copiar 
     * el primer parámetro que le pasamos en el método `model`.
     * Esto es necesario para poder utilizar el método populate.
     * 
     * Ej: En el modelo User tenemos:
     *  const UserModel = model("User", userSchema);
     * 
     * Por tanto tenemos que copiar y pegar la referencia `User`
     */
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
  },
  {
    timestamps: true,
  }
);

const PostModel = model('posts', PostSchema);

module.exports = PostModel;
