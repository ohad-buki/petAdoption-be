const pool = require("./mysqlDB");
const SQL = require("@nearform/sql");
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

const addUser = async (
  password,
  email,
  userName,
  age,
  description,
  phone,
  photo_url
) => {
  try {
    const sql = `INSERT INTO users (password,phone,name,description,age,email,photo_url) VALUES ('${password}','${phone}','${userName}','${description}','${age}','${email}','${photo_url}');`;
    const res = await quary(sql);
    return res;
  } catch (e) {
    return e;
  }
};

const getUserBy = async (colName, value) => {
  try {
    const user = await quary(
      `SELECT * FROM users WHERE ${colName} = '${value}';`
    );
    return user;
  } catch (e) {
    return e;
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

const updateUser = async (set, userId) => {
  try {
    const res = await quary(
      `UPDATE users SET ${set} WHERE user_id = ${userId};`
    );
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports.quary = quary;
module.exports.getUserBy = getUserBy;
module.exports.getAllUsers = getAllUsers;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
