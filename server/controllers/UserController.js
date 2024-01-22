const { comparePassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { User } = require(`../models/index`);

class UserController {
  static async addUser(req, res, next) {
    try {
      const { email, password, phoneNumber, address, username } = req.body;
      const userCreate = await User.create({
        email,
        password,
        phoneNumber,
        address,
        username,
      });

      const data = await User.findOne({
        where: { email },
        attributes: ["id", "username"],
      });
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: `EmailIsRequired` };
      }
      if (!password) {
        throw { name: `PasswordIsRequired` };
      }

      const userData = await User.findOne({
        where: { email },
      });

      if (!userData) {
        throw { name: `EmailIsInvalid` };
      }

      const validPass = comparePassword(password, userData.password);

      if (!validPass) {
        throw { name: `PasswordIsInvalid` };
      }

      const access_token = signToken(userData);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async template(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
