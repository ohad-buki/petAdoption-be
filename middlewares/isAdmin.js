const { quary } = require("../data/mysqlUsers");

const isAdmin = () => {
  return async (req, res, next) => {
    try {
      const [admin] = await quary(
        `SELECT is_admin FROM users WHERE user_id = ${req.decoded.id};`
      );
      if (!admin.is_admin) {
        res.status(403).send({ message: "not a admin" });
        return;
      }
      next();
    } catch (error) {
      res.send(error);
      return;
    }
  };
};

module.exports = isAdmin;
