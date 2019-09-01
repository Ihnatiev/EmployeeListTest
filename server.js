const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3002;

const employeeRoutes = require('./backend/routes/employee.routes');
const userRoutes = require('./backend/routes/user.routes');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(port, () => {
  console.log('Server started on the port ' + port);
});

app.use("/api/employees", employeeRoutes);
app.use("/api/user", userRoutes);
