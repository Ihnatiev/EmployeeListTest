const express = require('express');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');
const swaggerUi = require('swagger-ui-express');
const swagDoc = require('./swagger/swagger.json');
const { handleError } = require('./middleware/errorHandler');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagDoc));
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", userRoutes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;