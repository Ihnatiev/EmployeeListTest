const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');
const swagDoc = require('./swagger-copy.json');
const swaggerUi = require('swagger-ui-express');
const userSchema = require('./new-user.json');
const Ajv = require('ajv');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

const ajv = Ajv({ allErrors: true, removeAdditional: 'all' });
ajv.addSchema(userSchema, 'new-user');

function errorResponse(schemaErrors) {
  let errors = schemaErrors.map((error) => {
    return {
      message: error.message
    }
  })
  return {
    status: 'failed',
    errors: errors
  }
};

let validateSchema = (schemaName) => {
  return (req, res, next) => {
    let valid = ajv.validate(schemaName, req.body)
    if (!valid) {
      return res.status(400).send(errorResponse(ajv.errors))
    }
    next()
  }
};
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagDoc));
app.use("/api/employees", employeeRoutes);
app.use("/api/auth/signup", validateSchema('new-user'), userRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;