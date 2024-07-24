const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  // console.log(payload)
  // console.log(process.env.KEYWORD)
  return jwt.sign(payload, process.env.KEYWORD);
};

const readPayload = (token) => {
  return jwt.verify(token, process.env.KEYWORD);
};

module.exports = { createToken, readPayload };
