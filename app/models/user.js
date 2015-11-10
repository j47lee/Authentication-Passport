var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// user schema
var userSchema = mongoose.Schema({
  local : {
    email: String,
    password: String
  }
});

// generate hash
userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if the password is valid
userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password);
};

// create use model and export
module.exports = mongoose.model('User', userSchema)
