const express = require("express");
const router = express.Router();
const {
  getPetsLikedByUser,
  addLike,
  getUsersThatLikedPet,
  deleteLike,
  getSpecificLike,
} = require("../data/mysqlLikes");
const { authenticationToken } = require("../middlewares/authToken");

router.post("/", authenticationToken(), async (req, res, next) => {
  try {
    const { user_id, pet_id } = req.body;
    const exist = await getSpecificLike(user_id, pet_id);
    if (exist.length > 0) {
      return;
    }
    const response = await addLike(user_id, pet_id);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.put("/", authenticationToken(), async (req, res, next) => {
  try {
    const { user_id, pet_id } = req.body;
    const response = await deleteLike(user_id, pet_id);
    res.send(response);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/getPetsByUser/:user_id",
  authenticationToken(),
  async (req, res, next) => {
    try {
      const { user_id } = req.params;
      const petsUserLikes = await getPetsLikedByUser(user_id);
      res.send(petsUserLikes);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/getUsersByPet/:pet_id",
  authenticationToken(),
  async (req, res, next) => {
    try {
      const { pet_id } = req.params;
      const usersByPet = await getUsersThatLikedPet(pet_id);
      res.send(usersByPet);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/specific/:user_id/:pet_id",
  authenticationToken(),
  async (req, res, next) => {
    try {
      const { user_id, pet_id } = req.params;
      const like = await getSpecificLike(user_id, pet_id);
      res.send(like);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
