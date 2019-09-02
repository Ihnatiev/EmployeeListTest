const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/connection');

const employeeRoutes = require('./routes/employee.routes');
const userRoutes = require('./routes/user.routes');

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

connection.connect((err) => {
  if (!err) {
    console.log('DB connection succeded.');
  } else {
    console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
  }
});

app.use("/api/employees", employeeRoutes);
app.use("/api/user", userRoutes);


module.exports = app;