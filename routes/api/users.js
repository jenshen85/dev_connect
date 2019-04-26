const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const secretKey = require('../../config/keys').secretOrKey;

// load User model
const User = require('../../models/User');

// @route api/users/test
// @desc Test users route
// @access Public
router.get('/test', (req, res) => {
  res.json({msg: 'Users works'})
});

// @route api/users/register
// @desc Register users
// @access Public
router.post('/register', (req, res) => {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      if(user) {
        res.status(400).json({email: 'Email already exists'});
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200', // size
          r: 'pg', // raiting
          d: 'mm', // default
        })
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar: avatar,
          password: req.body.password,
        })
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => res.json(user))
              .catch((err) => console.log(err));
          })
        })
      }
    })
});

// @route api/users/login
// @desc Login Users / return JWT token
// @access Public
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // find user by email
  User
    .findOne({email})
    .then((user) => {
      // check for user
      if(!user) {
        return res.status(404).json({email: 'User not found'});
      };

      // check password
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if(isMatch) {
            // return res.json({msg: 'Success'});

            // User matched
            const payload = {   // create JWT Payload
              id: user.id,
              name: user.name,
              avatar: user.avatar,
            }

            // Sign Token
            jwt.sign(
              payload,
              secretKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`,
                })
              }
            );
          } else {
            return res.status(400).json({password: 'Password incorrect'});
          }
        });
    })
})

// @route GET api/users/current
// @desc Return current User
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
})

module.exports = router;