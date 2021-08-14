const S = require("fluent-json-schema");
const validateS = require("./schemavalid");

const newPetSchema = S.object()
  .prop("type", S.string().required())
  .prop("name", S.string().required())
  .valueOf();
const validateNewPet = () => {
  return validateS(newPetSchema);
};

const petSchema = S.object()
  .prop("type", S.string())
  .prop("name", S.string())
  .prop("color", S.string())
  .prop("age", S.string())
  .prop("height", S.string())
  .prop("weight", S.string())
  .prop("photo_url", S.string())
  .prop("dietary_restrictions", S.string())
  .prop("hypoallergenic", S.boolean())
  .valueOf();
const validatePet = () => {
  return validateS(petSchema);
};

const heightWeight = (key, value) => {
  if (key == "maxHeight") {
    return ` height < ${value}`;
  } else if (key === "maxWeight") {
    return ` weight < ${value}`;
  } else if (key === "minHeight") {
    return ` height > ${value}`;
  } else if (key === "maxWeight") {
    return ` weight > ${value}`;
  } else if (key === "hypoallergenic") {
    return ` hypoallergenic = ${value}`;
  }
};

const petsVal = {
  heightWeight: heightWeight,
  validatePet: validatePet,
  validateNewPet: validateNewPet,
};

module.exports = petsVal;
