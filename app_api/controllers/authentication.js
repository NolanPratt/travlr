const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/user');
//const userModel = mongoose.model('users');

// Register new user
const register = (req, res) => {
  // Catch improper register request
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  // Create new User
  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  // Save User & generate Jwt for credentials
  user.save()
    .then(() => {
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    })
    .catch(err => {
      res
        .status(400)
        .json(err);
    });
};

// Login with existing credentials
const login = (req, res) => {
  // Catch improper login request
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  // Use passport service to authenticate credentials
  passport.authenticate('local', (err, user, info) => {
    // Credentials do not match
    if (err) {
      return res
        .status(404)
        .json({ "message": "Credentials not found" } + err);
    }

    // Credentials match
    if (user) {
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    } else {
      res
        .status(401)
        .json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};