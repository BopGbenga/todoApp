const express = require("express");
const controllers = require("../users/users.controllers");
const middlewares = require("../users/user.middlewares");

const router = express.Router();

router.post("/signup", middlewares.validateUser, async (req, res) => {
  const response = await controllers.createUser({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });
  if (response.code === 422) {
    const errorMessage = "User already exixts";
    res.render("signup", {
      errorMessage: errorMessage,
      navs: ["Login", "Home"],
    });
  }

  if (response.code === 201) {
    res.redirect("/login");
  }
});

router.post("/login", middlewares.loginUser, async (req, res) => {
  const response = await controllers.login({
    username: req.body.username,
    password: req.body.password,
  });

  if (response.code === 422) {
    const errorMessage = "Incorrect username or password";
    res.render("login", {
      errorMessage: errorMessage,
      navs: ["Signup", "Home"],
    });
  }
  if (response.code === 200) {
    res.cookie("jwt", response.token, { maxAge: 60 * 60 * 1000 });
    res.redirect("/dashboard");
  }
});

module.exports = router;
