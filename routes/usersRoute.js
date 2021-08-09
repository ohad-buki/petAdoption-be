const express = require("express");
const router = express.Router();
const {
  validatelogin,
  validateEditUser,
  validateUser,
} = require("../middlewares/userValid");
const {
  quary,
  getUserByEmail,
  getUserById,
  addUser,
  getAllUsers,
  updateUser,
} = require("../data/mysqlUsers");
const bcrypt = require("bcrypt");

router.get("/", async (req, res, next) => {
  try {
    const data = await getAllUsers();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.post("/signUp", validateUser(), async (req, res, next) => {
  try {
    const { name, age, email, phone, description, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await getUserByEmail(email);
    if (user[0]) {
      const validPass = await bcrypt.compare(password, user[0].password);
      if (validPass) {
        res.send(user);
        return;
      }
      res.status(400).send("user allready exists but password dosnt match");
      return;
    } else {
      await addUser(hash, email, name, age, description, phone);
      const user = await getUserByEmail(email);
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", validatelogin(), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
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
    const id = req.params.id;
    const set = "";
    console.log(req.body);
    if (req.body !== {}) {
      const arr = Object.entries(req);
      arr.forEach(async (item) => {
        set += `'${item[0]}' = '${item[1]}',`;
      });
      const user = await getUserById(id);
      res.send(user);
      return;
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
