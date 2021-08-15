const express = require("express");
const router = express.Router();
const {
  addPet,
  updatePet,
  getPetsBy,
  getPetsByLimit,
} = require("../data/mysqlPets");
const {
  heightWeight,
  validatePet,
  validateNewPet,
} = require("../middlewares/petValid.js");

const heightWeightString =
  "maxHeight maxWeight minHeight minWeight hypoallergenic";

router.get("/", async (req, res, next) => {
  let where = "";
  const reqArr = Object.entries(req.query);
  try {
    if (reqArr.length > 0) {
      reqArr.forEach(([key, value], i) => {
        if (value && value !== "") {
          if (i === 0) {
            if (heightWeightString.includes(key)) {
              where += `WHERE ${heightWeight(key, value)}`;
            } else {
              where += `WHERE ${key} = '${value}'`;
            }
          } else {
            if (heightWeightString.includes(key)) {
              where += ` AND ${heightWeight(key, value)}`;
            } else {
              where += ` AND ${key} = '${value}'`;
            }
          }
        }
      });
    }
    const data = await getPetsBy(where);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get("/limit/:limit", async (req, res, next) => {
  const { limit } = req.params;
  try {
    const pets = await getPetsByLimit(limit);
    res.send(pets);
  } catch (e) {
    next(e);
  }
});

router.put("/edit/:pet_id", validatePet(), async (req, res, next) => {
  let set = "";
  const { pet_id } = req.params;
  const reqArr = Object.entries(req.body);
  try {
    if (reqArr.length > 0) {
      reqArr.forEach(([key, value], i) => {
        if (value && value !== "") {
          if (i === 0) {
            // if (heightWeightString.includes(key)) {
            //   set += `${heightWeight(key, value)}`;
            // } else {
            set += `${key} = '${value}'`;
            // }
          } else {
            // if (heightWeightString.includes(key)) {
            //   set += ` , ${heightWeight(key, value)}`;
            // } else {
            set += ` , ${key} = '${value}'`;
            // }
          }
        }
      });
      await updatePet(set, pet_id);
    }
    const data = await getPetsBy(`WHERE pet_id = ${pet_id}`);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.post(
  "/addPet",
  validateNewPet(),
  validatePet(),
  async (req, res, next) => {
    try {
      await addPet(req.body);
      res.send("Success");
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
