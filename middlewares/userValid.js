const S = require("fluent-json-schema");
const { quary } = require("../data/mysqlUsers");
const validateS = require("./schemavalid");

const newUserSchema = S.object()
  .prop("name", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).required())
  .prop("age", S.string())
  .prop("phone", S.string().minLength(9).maxLength(11))
  .prop("description", S.string())
  .prop("photo_url", S.string())
  .valueOf();
const validateUser = () => {
  return validateS(newUserSchema);
};

const editUserSchema = S.object()
  .prop("name", S.string())
  .prop("email", S.string())
  .prop("password", S.string())
  .prop("phone", S.string().minLength(9).maxLength(11))
  .prop("age", S.string())
  .prop("description", S.string())
  .prop("photo_url", S.string())
  .prop("is_admin", S.boolean())
  .valueOf();
const validateEditUser = () => {
  return validateS(editUserSchema);
};

const loginSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(5).required())
  .valueOf();
const validatelogin = () => {
  return validateS(loginSchema);
};

const getUserSchema = S.object()
  .prop("email", S.string())
  .prop("name", S.string())
  .valueOf();
const validateGetUser = () => {
  return validateS(getUserSchema);
};

const userVal = {
  validateUser: validateUser,
  validateEditUser: validateEditUser,
  validatelogin: validatelogin,
  validateGetUser: validateGetUser,
};

module.exports = userVal;
