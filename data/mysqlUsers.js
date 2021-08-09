const pool = require("./mysqlDB");

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

const addUser = async (password, email, userName, age, description, phone) => {
  try {
    const sql = `INSERT INTO users (password,phone,name,description,age,email) VALUES ('${password}','${phone}','${userName}','${description}',${age},'${email}');`;
    const res = await quary(sql);
    return res;
  } catch (e) {
    return e;
  }
};

const getUserByEmail = async (userEmail) => {
  try {
    const user = await quary(
      `SELECT * FROM users WHERE email = '${userEmail}';`
    );
    return user;
  } catch (e) {
    return e;
  }
};

const getUserById = async (id) => {
  try {
    const user = await quary(`SELECT * FROM users WHERE user_id = '${id}';`);
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
    const res = await quary(`UPDATE users
        SET ${set}
        WHERE user_id = '${userId}';`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

module.exports.quary = quary;
module.exports.getUserByEmail = getUserByEmail;
module.exports.getUserById = getUserById;
module.exports.getAllUsers = getAllUsers;
module.exports.addUser = addUser;
module.exports.updateUser = updateUser;
