const { verifyToken } = require("../helpers/jwt");
const { User } = require(`../models/index`);

async function authenticationMiddleware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw { name: "Invalid Token" };
    }
    const rawToken = authorization.split(" ");

    if (rawToken[0] !== "Bearer") {
      throw { name: "Invalid Token" };
    }

    const result = verifyToken(rawToken[1]);

    const user = await User.findByPk(result.id);

    if (!user) {
      throw { name: "Invalid Token" };
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = { authenticationMiddleware };
