const express = require("express");
const router = express.Router();
const {
  validatelogin,
  validateEditUser,
  validateUser,
  validateGetUser,
} = require("../middlewares/userValid");
const {
  quary,
  getUserBy,
  addUser,
  getAllUsers,
  updateUser,
} = require("../data/mysqlUsers");
const { sign, authenticationToken } = require("../middlewares/authToken");
const bcrypt = require("bcrypt");
const isAdmin = require("../middlewares/isAdmin");

router.get(
  "/",
  authenticationToken(),
  isAdmin(),
  validateGetUser(),
  async (req, res, next) => {
    let where = "";
    const reqArr = Object.entries(req.query);
    try {
      if (reqArr.length !== 0) {
        reqArr.forEach(([key, value], i) => {
          if (value && value !== "") {
            if (i === 0) {
              where += `${key} = '${value}'`;
            } else {
              where += ` AND ${key} = '${value}'`;
            }
          }
        });
        console.log(where);
        const data = await getUserBy(where);
        console.log(data);
        res.send(data);
        return;
      }
      const data = await getAllUsers(where);
      res.send(data);
      return;
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/logedin",
  authenticationToken(),
  validateGetUser(),
  async (req, res, next) => {
    let where = `WHERE user_id = ${req.decoded.id}`;
    try {
      const user = await getAllUsers(where);
      const { password, ...rest } = user[0];
      res.send(rest);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/signUp", validateUser(), async (req, res, next) => {
  try {
    const { name, age, email, phone, description, password, photo_url } =
      req.body;
    const whereEmail = `email = '${email}'`;
    const hash = await bcrypt.hash(password, 10);
    let user = await getUserBy(whereEmail);
    if (user[0]) {
      const validPass = await bcrypt.compare(password, user[0].password);
      if (validPass) {
        res.send(user);
        return;
      }
      res.status(400).send("user allready exists but password dosnt match");
      return;
    } else {
      await addUser(hash, email, name, age, description, phone, photo_url);
      user = await getUserBy(whereEmail);
      const { password, ...rest } = user[0];
      const token = sign({ id: user[0].user_id });
      res.send({ user: rest, token: token });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", validatelogin(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const whereEmail = `email = '${email}'`;
    const user = await getUserBy(whereEmail);
    if (user[0]) {
      const validPass = await bcrypt.compare(password, user[0].password);
      if (validPass) {
        const { password, ...rest } = user[0];
        const token = sign({ id: user[0].user_id });
        res.send({ user: rest, token: token });
        return;
      } else {
        res.status(400).send("password dosnt match");
      }
    } else {
      res.status(400).send("user dosnt exist");
    }
  } catch (err) {
    next(err);
  }
});

router.put(
  "/edit/:id",
  authenticationToken(),
  validateEditUser(),
  async (req, res, next) => {
    if (req.query.is_admin) {
      isAdmin();
    }
    try {
      const { id } = req.params;
      let set = "";
      const arr = Object.entries(req.body);
      if (arr.length > 0) {
        arr.forEach((item, i) => {
          if (item[0] == "is_admin") {
            set += `${item[0]} = ${item[1]}`;
          } else if (item[1] && item[1] !== "") {
            if (i === arr.length - 1) {
              set += `${item[0]} = '${item[1]}'`;
            } else {
              set += `${item[0]} = '${item[1]}',`;
            }
          }
        });
        await updateUser(set, id);
        const where = `user_id = ${id}`;
        const user = await getUserBy(where);
        res.send(user);
        return;
      }
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
