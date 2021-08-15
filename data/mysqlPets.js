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

const getPetsBy = async (where) => {
  try {
    const pets = await quary(`SELECT * FROM pets ${where};`);
    return pets;
  } catch (e) {
    return e;
  }
};

const getPetsByLimit = async (limit) => {
  try {
    const user = await quary(
      `SELECT * FROM pets WHERE status = "available" LIMIT ${limit};`
    );
    return user;
  } catch (e) {
    return e;
  }
};

const updatePet = async (set, pet_id) => {
  try {
    const res = await quary(`UPDATE pets SET ${set} WHERE pet_id = ${pet_id};`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const addPet = async ({
  name,
  type,
  age,
  photo_url,
  color,
  weight,
  height,
  dietary_restrictions,
  hypoallergenic,
}) => {
  try {
    const sql = `INSERT INTO pets (type,color,name,weight,age,height,photo_url,dietary_restrictions,hypoallergenic) VALUES ('${type}','${color}','${name}',${weight},'${age}',${height},'${photo_url}','${dietary_restrictions}',${hypoallergenic});`;
    const res = await quary(sql);
    return res;
  } catch (e) {
    return e;
  }
};

const mysqlPets = {
  addPet: addPet,
  updatePet: updatePet,
  getPetsBy: getPetsBy,
  getPetsByLimit: getPetsByLimit,
};

module.exports = mysqlPets;
