const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');   // Fetch the User model class. Reason why we don't require/import entire User.js directly: avoid multiple imports that may cause issues in testing environment

passport.serializeUser((user, done) => {  //user: the User model instance that's just fetched from/created in MongoDB, by passport.use()'s callback function
  done(null, user.id);              // user.id: NOT googleID. It's the User model instance ID, i.e. this user's record ID in MongoDB.
});

passport.deserializeUser((id, done) => {  // id: The identifying token in Cookie, i.e. the user.id when serializeUser.
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})      // After deserializeUser is finished, passport automatically attaches user to req object

/*Configures passport*/
passport.use(
  new GoogleStrategy(
  {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'  // Redirect user back to this route, after user grants permission at Google server
  },
  (accessToken, refreshToken, profile, done) => { // This callback function is automatically executed after Google sends back user profile.
    User.findOne({ googleId: profile.id}).then(existingUser => {    // findOne() returns a model instance if a match is found, or null if not found
      if (existingUser) {
        done(null, existingUser);   // done(errorObject, info): tell passport we're done using profile info, and it should resume the auth process
      } else {
        new User({ googleId: profile.id})
        .save()     // Create a new record into User collection in MongoDB, using Mongoose User model
        .then(user => done(null, user)); // user: The user record/model instance we get from database, after it's saved
      }
    });
  })
);
