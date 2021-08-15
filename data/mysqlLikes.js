const { pool } = require("./mysqlDB");

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

const addLike = async (user_id, pet_id) => {
  try {
    const sql = `INSERT INTO likes (user_id,pet_id) VALUES (${user_id},${pet_id});`;
    const res = await quary(sql);
    return res;
  } catch (e) {
    return e;
  }
};

const deleteLike = async (user_id, pet_id) => {
  try {
    const sql = `DELETE FROM likes WHERE user_id =${user_id} AND pet_id =${pet_id};`;
    const res = await quary(sql);
    return res;
  } catch (e) {
    return e;
  }
};

const getPetsLikedByUser = async (user_id) => {
  try {
    const pets = await quary(
      `SELECT * FROM pets WHERE pet_id IN (SELECT pet_id FROM likes WHERE user_id = ${user_id});`
    );
    return pets;
  } catch (e) {
    return e;
  }
};

const getUsersThatLikedPet = async (pet_id) => {
  try {
    const users = await quary(
      `SELECT * FROM users WHERE user_id IN (SELECT user_id FROM likes WHERE pet_id = ${pet_id});`
    );
    return users;
  } catch (e) {
    return e;
  }
};

const getSpecificLike = async (user_id, pet_id) => {
  try {
    const like = await quary(
      `SELECT * FROM likes WHERE pet_id = ${pet_id} AND user_id = ${user_id};`
    );
    return like;
  } catch (e) {
    return e;
  }
};

const mysqlLikes = {
  addLike: addLike,
  getPetsLikedByUser: getPetsLikedByUser,
  getUsersThatLikedPet: getUsersThatLikedPet,
  deleteLike: deleteLike,
  getSpecificLike: getSpecificLike,
};

module.exports = mysqlLikes;
