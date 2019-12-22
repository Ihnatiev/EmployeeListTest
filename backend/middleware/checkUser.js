const checkUserCreate = (req, res, next) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).send('Invalid data');
  } else {
    next();
  }
};

const checkUserLogin = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).send('Invalid data');
  } else {
    next();
  }
};

module.exports = {
  checkUserCreate,
  checkUserLogin
};
