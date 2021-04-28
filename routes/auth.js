const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const saltRounds = 10;
const User = require('../models/User.model')
const ensureLogin = require('connect-ensure-login');
const { isLoggedOut } = require('../middlewares/index')

router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup')
});
router.post('/signup', (req, res, next) =>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.render('auth/signup', {errorMessage: "Please fill all fields"})
    }
    User.findOne({ username })

    .then((user) =>{
        if(user){
            res.render('auth/signup', {errorMessage: "This email already exists"})
        }
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log({username, email, password});

        User.create({ username, email, password: hashPassword })
        .then((newUser) => {
            if({username}){
                res.render('auth/signup', {errorMessage: "This username already exists"})
            } 
            req.login(newUser, (error) => {
                if(error) next(error);
                return res.redirect('/profile')
            })
        })
        .catch((error) =>{
            console.error(error);
            res.render('auth/signup', {errorMessage: "Ups! Something went wrong. Please try again"})
        })
    })
})

router.get('/login', isLoggedOut, (req, res) =>{
    res.render('auth/login', {errorMessage: req.flash('error')[0]})
})

router.post('/login', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
  }));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
  })

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google', {
    successRedirect: "/profile",
    failureRedirect: "/auth/login"
  }))
module.exports = router;