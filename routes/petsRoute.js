const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  let where = "";
  const reqArr = Object.entries(req.body);
  try {
    reqArr.forEach(([key, value], i) => {
      if (value && value !== "") {
        if (i === 0) {
          where += `${key} = '${value}'`;
        } else {
          where += ` AND ${key} = '${value}'`;
        }
      }
    });
    const data = await getPetsBy(where);
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.post("/addPat", async (req, res, next) => {
  try {
    const {
      name,
      type,
      age,
      photo_url,
      color,
      weight,
      height,
      dietary_restrictions,
      hypoallergenic,
    } = req.body;
    await addPet(
      name,
      type,
      age,
      photo_url,
      color,
      weight,
      height,
      dietary_restrictions,
      hypoallergenic
    );
    res.send("Success");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
