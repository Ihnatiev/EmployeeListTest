const express = require('express');
const bodyParser = require('body-parser');
// const path = require('path');
const port = process.env.PORT || 3002;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
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

//connect to DB
const routes = require('./backend/routes/employees');
routes(app);