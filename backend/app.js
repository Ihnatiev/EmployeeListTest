const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/connection');
const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const validator = require('swagger-express-validator');

const app = express();

const opts = {
  swaggerDocument, // Swagger schema
  preserveResponseContentType: true, // Do not override responses for validation errors to always be JSON, default is true
  returnRequestErrors: true, // Include list of request validation errors with response, default is false
  returnResponseErrors: true, // Include list of response validation errors with response, default is false
  validateRequest: true,
  validateResponse: true,
  requestValidationFn: (req, data, errors) => {
    console.log(`failed request validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
  },
  responseValidationFn: (req, data, errors) => {
    console.log(`failed response validation: ${req.method} ${req.originalUrl}\n ${util.inspect(errors)}`)
  },
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator(opts));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token , Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json(err);
});


// connection.connect((err) => {
//   if (!err) {
//     console.log('DB connection succeded.');
//   } else {
//     console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
//   }
// });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", userRoutes);


module.exports = app;