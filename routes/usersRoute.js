const express = require("express");
const router = express.Router();
const fs = require("fs");
const usersDataPath = "./routes/usersdata.json";
const userVal = require("../middlewares/userValid");

const getAllUsers = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersDataPath, (err, buffer) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(buffer.toString()));
    });
  });
};

const postAllUsers = async (users) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(usersDataPath, JSON.stringify(users), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

router.get("/", async (req, res, next) => {
  try {
    const data = await getAllUsers();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.post("/signUp", async (req, res, next) => {
  try {
    valid = userVal.validateUser(req.body);
    if (!valid) {
      throw new Error("invalid input");
    }
    const allUsers = await getAllUsers();
    const newUserId = req.body.email;
    if (allUsers[newUserId]) {
      res.send(allUsers[newUserId]);
    } else {
      allUsers[newUserId] = { ...req.body, isAdmin: false };
      await postAllUsers(allUsers);
      res.send(allUsers[newUserId]);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    valid = userVal.validatelogin(req.body);
    if (!valid) {
      throw new Error("invalid input");
    }
    const allUsers = await getAllUsers();
    if (
      allUsers[req.body.email] &&
      allUsers[req.body.email].password === req.body.password
    ) {
      res.send(allUsers[req.body.email]);
    } else {
      throw new Error("password or email dont match");
    }
  } catch (err) {
    err.status = 400;
    next(err);
  }
});

router.put("/edit/:id", async (req, res, next) => {
  try {
    valid = userVal.validateEditUser(req.body);
    if (!valid) {
      throw new Error("invalid input");
    }
    const allUsers = await getAllUsers();
    const id = req.params.id;
    allUsers[id] = { ...allUsers[id], ...req.body };
    if (req.body.email) {
      allUsers[req.body.email] = allUsers[id];
      delete allUsers[id];
      id = req.body.email;
    }
    await postAllUsers(allUsers);
    res.send(allUsers[id]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
