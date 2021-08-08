const S = require("fluent-json-schema");
const Ajv = require("ajv");
const ajv = new Ajv();

const newUserSchema = S.object()
  .prop("name", S.string().required())
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(6).required())
  .prop("age", S.string().maxLength(3))
  .prop("phone", S.string().minLength(9).maxLength(11))
  .prop("description", S.string())
  .prop("photoURL", S.string())
  .valueOf();
const validateUser = ajv.compile(newUserSchema);

const editUserSchema = S.object()
  .prop("name", S.string())
  .prop("email", S.string())
  .prop("password", S.number().minimum(6))
  .prop("age", S.number().maximum(3))
  .prop("description", S.string())
  .prop("photoURL", S.string())
  .valueOf();
const validateEditUser = ajv.compile(editUserSchema);

const loginSchema = S.object()
  .prop("email", S.string().required())
  .prop("password", S.string().minLength(5).required())
  .valueOf();
const validatelogin = ajv.compile(loginSchema);
// const validatelogin = (req,res,next)=>{
//   try{
//     const validate = ajv.compile(loginSchema);
//     const valid = validate(req.body);
// if (!valid) throw new Error("invalid input");
// next()
//   }catch(err){
//     next(err)
//   }
// }

const userVal = {
  validateUser: validateUser,
  validateEditUser: validateEditUser,
  validatelogin: validatelogin,
};

module.exports = userVal;
