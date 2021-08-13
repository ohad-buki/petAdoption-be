const Ajv = require("ajv");
const ajv = new Ajv();

const validateS = (schema) => {
  return (req, res, next) => {
    const query = Object.keys(req.query).length;
    try {
      const validate = ajv.compile(schema);
      const valid = validate(query ? req.query : req.body);
      if (!valid) {
        throw new Error("invalid input");
      } else {
        next();
      }
    } catch (err) {
      res.status(400).send(err.message);
    }
  };
};

module.exports = validateS;
