const joi = require("joi");

const validateUser = async (req, res, next) => {
  try {
    const userSchema = joi.object({
      email: joi.string().email().required(),
      username: joi.string().required(),
      password: joi.string().required(),
    });

    await userSchema.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    res.status(422).json({
      message: "invalid info",
      error: error.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const userSchema = joi.object({
      username: joi.string().required(),
      password: joi.string().required(),
    });

    await userSchema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(422).json({
      messsage: "invalid error",
      error: error.message,
    });
  }
};
module.exports = { validateUser, loginUser };
