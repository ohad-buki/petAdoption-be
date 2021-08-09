const S = require("fluent-json-schema");
const validateS = require("./schemavalid");

const newUserSchema = S.object()
  .prop("name", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).required())
  .prop("age", S.string(3))
  .prop("phone", S.string().minLength(9).maxLength(11))
  .prop("description", S.string())
  .prop("photoURL", S.string())
  .valueOf();
const validateUser = () => {
  return validateS(newUserSchema);
};

const editUserSchema = S.object()
  .prop("name", S.string())
  .prop("email", S.string())
  .prop("password", S.number().minimum(6))
  .prop("age", S.number().maximum(3))
  .prop("description", S.string())
  .prop("photoURL", S.string())
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

const userVal = {
  validateUser: validateUser,
  validateEditUser: validateEditUser,
  validatelogin: validatelogin,
};

module.exports = userVal;
