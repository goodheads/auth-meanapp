var User        = require('./controllers/user.server.controller'),
    verifyToken = require('../config/tokenMiddleware');

module.exports = function(app) {
  // route for Login
  app.post('/api/login', User.authenticateUserByEmailAndPassword);

  // route to get all the Users currently registered
  app.get('/api/users', verifyToken, User.getAllUsers);
};
