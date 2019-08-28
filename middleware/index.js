const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const Users = require("../db-model/index");
const secrets = require("../config/secrets");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        //Bad Token!
        res.status(401).json({ message: "Token error - Middleware" });
      } else {
        //The token is a good token!
        req.decodedJwt = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "You Shall No pass - Middleware" });
  }
};
