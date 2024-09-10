const { User, Project } = require("../models");
const bcrypt = require("bcryptjs");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async login(req, res, next) {
    // console.log(req);
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ where: { email } });
      if (!user) {
        throw {
          code: 401,
          name: "Unauthorized",
          message: "invalid email/password",
        };
      } else {
        const isValidPass = bcrypt.compareSync(password, user.password);
        if (!isValidPass) {
          res.status(401).json({ message: "Invalid email/password" });
        } else {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            satKer: user.satKer
          };
          const access_token = createToken(payload);
          res.status(200).json({ access_token, payload });
        }
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async register(req, res, next) {
    try {
      const { name, email, password, role, satKer, phoneNumber } = req.body;
      const user = await User.create({
        name,
        email,
        password,
        role,
        satKer,
        phoneNumber,
      });
      res.status(201).json({ message: `user ${user.name} has been created` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const allUser = await User.findAll({
        include: [
          {
            model: Project,
          },
        ],
      });
      res.status(200).json(allUser);
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      User.destroy({ where: { id } });
      res.status(200).json({ message: "User delete success" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
