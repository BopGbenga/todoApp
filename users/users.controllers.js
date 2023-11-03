const UserModel = require("../models/usermodels");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const createUser = async ({ email, username, password }) => {
  try {
    const reqBody = { email, username, password };
    const existingUser = await UserModel.findOne({
      email: email,
    });
    if (existingUser) {
      return {
        code: 422,
        status: "error",
        data: "User already exist",
      };
    }

    if (password === username) {
      return {
        status: error,
        code: 400,
        data: "Username and password cannot be the same",
      };
    }
    const user = await UserModel.create({
      username,
      email,
      password,
    });
    return {
      status: "success",
      code: 201,
      message: "User created successfully",
      data: user,
    };
  } catch (error) {
    return {
      status: "error",
      code: 422,
      data: error.message,
    };
  }
};
const login = async ({ username, password }) => {
  const loginInfo = { username, password };
  const user = await UserModel.findOne({
    username: loginInfo.username,
  });

  if (!user) {
    return {
      code: 400,
      message: "user not found",
    };
  }

  const validPassword = await user.isValidPassword(loginInfo.password);
  if (!validPassword) {
    return {
      code: 422,
      message: "username or password not correct",
    };
  }

  const token = await jwt.sign(
    { _id: user._id, email: user.email, username: user.username },
    process.env.JWT_KEY,
    { expiresIn: "1h" }
  );
  return {
    code: 200,
    message: " Login successful",
    user,
    token,
  };
};

module.exports = { createUser, login };
