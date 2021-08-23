require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticationToken = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      res.status(401).send(error);
      return;
    }
  };
};

const sign = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

const auth = { sign: sign, authenticationToken: authenticationToken };

module.exports = auth;
