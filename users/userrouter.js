const express = require("express");
const Usermiddleware = require("./user.middlewares");
const controller = require("./users.controllers");
const cookieParser = require("cookie-parser");

const userRouter = express.Router();

userRouter.use(cookieParser());

userRouter.post("/signup", Usermiddleware.validateUser, controller.createUser);

userRouter.post("/login", Usermiddleware.validateUser, controller.login);

module.exports = userRouter;
