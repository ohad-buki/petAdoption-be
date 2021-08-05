const express = require("express");
const router = express.Router();
const fs = require("fs");
const usersDataPath = "./routes/usersdata.json";
const S = require("fluent-json-schema");
const { v4: uuidv4 } = require("uuid");

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
    fs.watchFile(usersDataPath, JSON.stringify(users), (err) => {
      if (err) {
        reject(err);
      }
      resolve();
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
    const allUsers = await getAllUsers();
    const newUserId = req.body.email;
    allUsers[newUserId] = req.body;
    await postAllUsers(allUsers);
    res.send(allUsers.newUserId);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    console.log(req.body);
    const allUsers = await getAllUsers();
    if (allUsers[req.body.email]) {
      res.send(allUsers[req.body.email]);
    } else {
      throw new Error("user dosnt exist");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
