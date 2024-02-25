const UserController = require('../Controllers/User.Controller');
const { User } = require('../Models/users.model');
const router = require('express').Router();
import  passport  from 'passport';
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// api register
router.post('/api/RegisterUser',UserController.RegisterUser);

// api login
router.post('/api/LoginUser',UserController.LoginUser);


// api auth par google 

  
  passport.use(new GoogleStrategy({
    clientID:  "137334899285-gfijdlbq4kma4lkc8sajvreofkqptso8.apps.googleusercontent.com",
    clientSecret:  "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",
    callbackURL: 'http://localhost:5000/auth/google/callback',
    passReqToCallback: true,
  },
  async function(req, accessToken, refreshToken, profile, cb) {
    try {
  
        console.log(profile);
      console.log(profile.emails[0].value);
  
      const existingUser = await UserService.FindUser(profile.emails[0].value);
  
      if (existingUser) {
        return cb(null, existingUser);
      }
  
      const newUser = await UserService.AddUser("id", "FirstName", "LastName", profile.emails[0].value, "password");
      return cb(null, newUser);
    } catch (err) {
      return cb(err);
    }
  }
  ));
  
  // Passport session serialization and deserialization
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

router.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] })) ; 

router.get('/auth/google/callback',
passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/auth/google/failure'
}))

module.exports = router;