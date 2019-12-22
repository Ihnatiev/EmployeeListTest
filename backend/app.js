const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');
const swaggerUi = require('swagger-ui-express');
const swagDoc = require('./swagger/swagger.json');
const { handleError } = require('./middleware/errorHandler');
require('./helpers/cors').init(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagDoc));
app.use("/api/employees", employeeRoutes);
app.use("/api/auth", userRoutes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
