module.exports = function(app, passport){

  app.get('/', function(req,res){
    res.render('index.ejs');
  });

  app.get('/login', function(req,res){
    res.render('login.ejs', { message : req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  }));

  app.get('/signup', function(req,res){
    res.render('signup.ejs', { message : req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', //send user to profile page if successful signup
    failureRedirect : '/signup', //send user to signup if unsuccessful signup
    failureFlash : true
  }));

  app.get('/profile', isLoggedIn, function(req,res){
    res.render('profile.ejs', {
      user : req.user // pass user from session to template
    });
  });

  app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
  });

  // middleware to check if user is logged in
  function isLoggedIn(req,res,next){
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

}; // end module.exports
