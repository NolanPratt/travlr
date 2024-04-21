const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
//const userModel = mongoose.model('users');

// Login function
passport.use(new LocalStrategy({
  usernameField: 'email'
},
async (username, password, done) => {
  try {
    // Query the database for the user credentials
    const user = await User.findOne({ email: username });

    // If the user is not found
    if (!user) {
      return done(null, false, {
        message: 'Incorrect username.'
      });
    }

    // If the password is not valid
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}
));