# EmployeeListTest
 
EmployeeListTest built with [NodeJS(v10.13)](https://nodejs.org/uk/), [MySQL(v2.17.1)](https://www.mysql.com/), [SwaggerUI Express(v4.1.2)](https://swagger.io/tools/swagger-ui/), [AngularJS(v1.5.8)](https://angularjs.org/) and [Gulp(v3.9.1)](https://gulpjs.com/). Also, upon completion of writing the backend, unit and integration tests were written in [Jest(v24.9.0)](https://jestjs.io/en/).

Node provides the RESTful API. Angular provides the frontend and accesses the API. MySQL stores like a hoarder. In this project, a database is created automatically. Database configurations are in [this file](https://github.com/Ihnatiev/EmployeeListTest/blob/master/backend/config/config.js).

# Requirements
 [NodeJS(v10.13)](https://nodejs.org/uk/) and [npm](https://docs.npmjs.com/)

# Installation
1. Clone or download the repository
2. Install node packages in root: npm install

## Servers start
In root directory run command `nodemon server` for start the backend project.
Then run command `gulp start` for start the frontend and navigate to [`http://localhost:3000`](http://localhost:3000). 

## Run unit and integration tests

For run tests need to run command `npm run test` via [Jest(v24.9.0)](https://jestjs.io/en/).

## Run swagger UI

Navigate to [`http://localhost:3002/api-docs/`](https://localhost:3002/api-docs/)
