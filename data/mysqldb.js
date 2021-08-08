const mysql = require("mysql");
require("dotenv").config();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "petadoption",
});

const quary = async (sqlText) => {
  return new Promise((resolve, reject) => {
    pool.query(sqlText, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getUser = async (userEmail) => {
  try {
    const user = await quary(
      `SELECT * FROM users WHERE email = '${userEmail}';`
    );
    return user;
  } catch (e) {
    console.log(e);
  }
};

const getAllUsers = async () => {
  try {
    const user = await quary(`SELECT * FROM users;`);
    return user;
  } catch (e) {
    console.log(e);
  }
};

const upDateUser = async (colName, value, userId) => {
  try {
    const res = await quary(`UPDATE users
        SET '${colName}' = '${value}'
        WHERE user_id = '${userId}';`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports.quary = quary;
module.exports.getUser = getUser;
module.exports.getAllUsers = getAllUsers;
