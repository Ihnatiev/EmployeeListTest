const httpsErrors = require("./httpsErrors");
exports.notFoundError = () => {
  throw new HTTPS404Error('Method not found.');
};

exports.clientError = (err, res, next) => {
  if (err instanceof HTTPSClientError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  else {
    next(err);
  }
};

exports.serverError = (err, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(500).json({ message: 'Internal Server Error' });
  }
  else {
    res.status(500).json({ message: err.stack });
  }
};
