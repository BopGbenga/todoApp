const jwt = require("jsonwebtoken");
require("dotenv").config();

const ensureLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.redirect("/login");
    }
    const decoded = await jwt.verify(token, process.env.JWT_KEY);
    res.locals.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send("Unauthorized");
  }
};

module.exports = { ensureLogin };
