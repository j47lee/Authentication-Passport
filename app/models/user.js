var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// user schema
var userSchema = mongoose.Schema({
  local : {
    email: String,
    password: String,
    ingredients: [],
    matches: []
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

// create user model and export
module.exports = mongoose.model('User', userSchema)
