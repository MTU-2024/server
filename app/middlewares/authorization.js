const { User } = require("../models");
const isAdmin = async (req, res, next) => {
  try {
    // console.log(req.params.id);
    // console.log('masuk')
    const idUser = req.userFind.id;
    const roleUser = req.userFind.role;
    const user = await User.findOne({ where: { id: idUser } });
    if (!user) {
      throw {
        name: "Request Not Found",
        code: 404,
        message: "error not found",
      };
    }
    if (roleUser === "Super Admin" || roleUser === "Admin") {
      next();
    } else {
      throw { name: "Only admin" };
      next();
    }
  } catch (err) {
    // console.log(err, "<<<<")
    next(err);
  }
};

module.exports = isAdmin;
