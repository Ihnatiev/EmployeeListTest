const Ajv = require('ajv');
const userSchemaCreate = require('./new-user.json');
const userSchemaLogin = require('./user-login.json');

const ajv = Ajv({ allErrors: true, removeAdditional: 'all' });
ajv.addSchema(userSchemaCreate, 'new-user');
ajv.addSchema(userSchemaLogin, 'user-login');

function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      message: error.message
    };
  })
  return {
    status: 'Bad Request',
    errors: errors
  }
};

const validateBody = (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body);
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors));
    }
    next();
  }
};

exports.validateBody = validateBody;
