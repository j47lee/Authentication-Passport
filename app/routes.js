var User = require('../app/models/user.js');

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

    // add ingredient to current user
    app.post('/addIng', function(req,res){
      // console.log(req.body.ingredient);
      // console.log(req.user.local.email);
      // console.log(req.user._id);

      // User.findOne({ 'local.email' : req.user.local.email }, function(err,user){
      //   if (err) throw err;
      //   userIngArray = user.local.ingredients;
      //   newIng = req.body.ingredient;
      //   userIngArray.push(newIng);
      // })

      // User.update({"local.email":req.user.local.email}, {$push: {"local.ingredients":req.body.ingredient}})
      // console.log(req.user.local);

      User.findById(req.user._id, function(err,user){
        if (err) throw err;
        user.local.ingredients = 'bananas';
        user.save(function(err){
          if (err) console.log(err);
          console.log('Successfully added ingredient');
        })
      })

      // Place.findById(req.params.id, function(err, p) {
      //   if (!p)
      //     return next(new Error('Could not load Document'));
      //   else {
      //     // do your updates here
      //     p.modified = new Date();
      //
      //     p.save(function(err) {
      //       if (err)
      //         console.log('error')
      //       else
      //         console.log('success')
      //     });
      //   }
      // });


      res.render('profile.ejs', { user : req.user })

    })

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
