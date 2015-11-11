var User = require('../app/models/user.js');
var Recipe = require('../app/models/recipe.js');
var compare = require('../config/compare.js');

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

    // run compare function to compare recipe and user ingredients
    compare(req.user.local.ingredients, req.user.local);

    res.render('profile.ejs', {
      user : req.user // pass user from session to template
    });

    // add ingredient to current user
    app.post('/addIng', function(req,res){
      User.findById(req.user._id, function(err,user){
        if (err) throw err;
        user.local.ingredients.push(req.body.ingredient);
        user.save(function(err){
          if (err) console.log(err);
          console.log('Successfully added ingredient');
          console.log(user);
        });
        res.render('profile.ejs', { user : req.user });
      });
    }); // end POST /addIng

    app.delete('/userIng/:id', function(req,res){

    })



  }); // end GET /profile

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
