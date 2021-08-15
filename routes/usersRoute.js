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
const bcrypt = require("bcrypt");

router.get("/", validateGetUser(), async (req, res, next) => {
  let where = "";
  const reqArr = Object.entries(req.query);
  try {
    if (reqArr.length !== 0) {
      reqArr.forEach(([key, value], i) => {
        if (value && value !== "") {
          if (i === 0) {
            where += `WHERE ${key} = '${value}'`;
          } else {
            where += ` AND ${key} = '${value}'`;
          }
        }
      });
    }
    const data = await getAllUsers(where);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.post("/signUp", validateUser(), async (req, res, next) => {
  try {
    const { name, age, email, phone, description, password, photo_url } =
      req.body;
    const hash = await bcrypt.hash(password, 10);
    let user = await getUserBy("email", email);
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
      user = await getUserBy("email", email);
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", validatelogin(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserBy("email", email);
    if (user[0]) {
      const validPass = await bcrypt.compare(password, user[0].password);
      if (validPass) {
        res.send(user);
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

router.put("/edit/:id", validateEditUser(), async (req, res, next) => {
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
      const user = await getUserBy("user_id", id);
      res.send(user);
      return;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
