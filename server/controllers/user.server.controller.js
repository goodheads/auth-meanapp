var User       = require('../models/user.server.model'),
    jwt         = require('jsonwebtoken'),
    _           = require('lodash'),
    secrets     = require('../../config/secrets');

module.exports = {

  /**
   * [authenticateUserByEmailAndPassword -- Authenticate User Email and Password]
   * @param  req
   * @param  res
   * @return Void
   */
  authenticateUserByEmailAndPassword: function(req, res){
    var email = req.body.email; // get the user's email from the request body

    // Generate a signed and unique token
    var token = jwt.sign(email, secrets.sessionSecret, { expiresInMinutes: 1440 });

    // Check if the email exists and return the user details based on that or otherwise
    User.find({email: email}, function(err, user) {
      if(err){
        return res.status(500).json({ error: err });
      }

      if(user.length === 0){
        return res.json({ success: false, message: 'Authentication failed. User not found.' });
      }
      else if(user.length == 1) {
        var users = new User();

        // Compare the user's password with the password present in the user's collection
        users.comparePassword(req.body.password, user[0].password, function(err, result){

          if(err){
            return res.status(500).json({ error: err });
          }

          // store the user detail in the userobject
          var userObject = user[0];

          // extract and return the needed user details
          var currUser   = _.pick(userObject, '_id', 'fullname');

          // if the passwords match, return the appropriate json response
          if(result){
            return res.json({
              success: true,
              user: currUser,
              token: token
            });
          } else {
            return res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          }
      });
    }});
  },

  /**
   * [getAllUsers -- Get All the Users registered on the platform]
   * @param   req
   * @param   res
   * @return  void
   */
  getAllUsers: function(req, res){
     User.find({}, function(err, users) {
        return res.json(users);
     });
  }
};