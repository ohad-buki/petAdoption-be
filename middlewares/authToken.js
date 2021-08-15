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
      console.log("not ok");
      console.log(error);
      res.status(401).send({ message: "Failed to authenticate", error });
    }
  };
};

const sign = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60m" });
};

const auth = { sign: sign, authenticationToken: authenticationToken };

module.exports = auth;
