const Ajv = require('ajv');
const empSchemaList = require('./emp-all.json');
const empSchemaById = require('./emp-id.json');
const empSchemaCreate = require('./emp-create.json');

const ajv = Ajv({ allErrors: true, removeAdditional: 'all' });
ajv.addSchema(empSchemaList, 'emp-all');
ajv.addSchema(empSchemaById, 'emp-id');
ajv.addSchema(empSchemaCreate, 'emp-create');

function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      path: error.dataPath,
      message: error.message
    };
  })
  return {
    status: 'failed',
    errors: errors
  }
};

const validateQuery = (schemaName) => {
  return (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const page = +req.query.page;
    const pagination = {
      pagesize: pageSize,
      page: page
    };
    const valid = ajv.validate(schemaName, pagination);
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors));
    }
    next();
  };
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

const validateId = (schemaName) => {
  return (req, res, next) => {
    const id = +req.params.employeeId;
    const params = {
      employeeId: id
    };
    const valid = ajv.validate(schemaName, params);
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors));
    }
    next();
  }
};


exports.validateQuery = validateQuery;
exports.validateBody = validateBody;
exports.validateId = validateId;
