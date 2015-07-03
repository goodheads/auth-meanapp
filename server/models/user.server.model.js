var mongoose          = require('mongoose'),
    bcrypt            = require('bcrypt'),
    userSchema        =  mongoose.Schema({
    fullname:      { type: String, required: true },
    email:         { type: String, required: true, unique: true },
    password:      { type: String, required: true },
    address:       { type: String, required: true, default: ''},
    registered_on: { type: Date, default: Date.now }
});

userSchema.methods.hashPassword = function(userpassword) {
  return bcrypt.hashSync(userpassword, bcrypt.genSaltSync(10), null);
};

userSchema.methods.comparePassword = function(requestPassword, dbpassword, cb) {
  bcrypt.compare(requestPassword, dbpassword, cb);
};

module.exports = mongoose.model('User', userSchema, 'users');