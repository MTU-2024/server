const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sortesystegraprospera@gmail.com",
    pass: "B@ngka.2024",
  },
});
const handlebars = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: "../views",
    defaultLayout: false,
  },
  viewPath: "../views",
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebars));

module.exports = {
  transporter,
};
