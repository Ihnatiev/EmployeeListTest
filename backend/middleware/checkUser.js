const { ErrorHandler } = require('./errorHandler');

const checkUserCreate = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    throw new ErrorHandler(400, 'Missing required fields');
  } else {
    next();
  }
};

const checkUserLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    throw new ErrorHandler(400, 'Missing required fields');
  } else {
    next();
  }
};

module.exports = {
  checkUserCreate,
  checkUserLogin
}