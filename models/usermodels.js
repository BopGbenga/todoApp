const mongoose = require("mongoose");
const bcypt = require("bcrypt");
const schema = mongoose.Schema;

const userSchema = new schema({
  email: {
    type: String,
    required: [true, "email is required."],
  },
  username: {
    type: String,
    required: [true, "username is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
});
//before save
userSchema.pre("save", async function (next) {
  const hash = await bcypt.hash(this.password, 10);
  this.password = hash;
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcypt.compare(password, user.password);
  return compare;
};

const UserModel = mongoose.model("users", userSchema);

module.exports = UserModel;
