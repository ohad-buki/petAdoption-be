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

const getPetsBy = async (where) => {
  try {
    const user = await quary(`SELECT * FROM users WHERE ${where};`);
    return user;
  } catch (e) {
    return e;
  }
};
