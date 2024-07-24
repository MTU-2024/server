const { User } = require("../models");
const { readPayload } = require("../helpers/jwt");

const isUser = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw {
        name: "Invalid token",
      };
    }
    const tokenVerify = readPayload(access_token);
    const { id } = tokenVerify;
    const user = await User.findOne({ where: id });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    req.userFind = {
      id: user.id,
      email: user.email,
      username: user.name,
      role: user.role,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isUser;
