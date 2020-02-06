const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: {
    required: true,
    type: String,
    minlength: [3, "please choose a user name with at least 3 characters."],
    trim: true
  },

  email: {
    required: true,
    type: String
  },

  password: {
    required: true,
    type: String,
    minlength: [5, "your password must be at least five characters long."],
    trim: true
  },

  proficiency: String,

  userResorts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resort"
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
