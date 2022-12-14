const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String, required: true, unique: true
    },
    password: { type: String, minlength: 8 },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const UserModel = model("User", userSchema);

module.exports = UserModel;
