const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { HttpError } = require("../helpers");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  const authenticateError = HttpError(401, "Not authorized");

  if (bearer !== "Bearer") next(authenticateError);

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) next(authenticateError);

    req.user = user;

    next();
  } catch (err) {
    next(authenticateError);
  }
};

module.exports = authenticate;
