const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }]
  },
  {
    timestamps: true,
  }
);

const PostModel = model('posts', PostSchema);

module.exports = PostModel;
