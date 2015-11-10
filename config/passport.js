var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user.js');

module.exports = function(passport){

  passport.serializeUser(function(user,done){
    done(null, user.id)
  });

  passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user){
      done(err, user);
    });
  });

  // LOCAL SIGNUP
  passport.use('local-signup', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // let's us pass the entire request to the callback
  },
  function(req, email, password, done){
    process.nextTick(function(){
      User.findOne({ 'local.email' : email }, function(err,user){
        if(err)
          return done(err);
        // checks if user already exists
        if(user) {
          return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {
          // if user does not already exists, proceed to creating user
          var newUser = new User();
          newUser.local.email = email;
          newUser.local.password = newUser.generateHash(password);
          newUser.save(function(err){
            if (err) throw err;
            return done(null, newUser);
          })
        }
      })
    })
  })

);// end local-signup


}; // end module.exports
