const express = require("express");
const controllers = require("../users/users.controllers");

const router = express.Router();

router.get("/home", (req, res) => {
  res.render("index");
});

router.post("/signup", async (req, res) => {
  const response = await controllers.createUser({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  if (response.code === 201) {
    res.redirect("/login");
  }
});

router.post("/login", async (req, res) => {
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
