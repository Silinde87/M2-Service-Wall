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
    const {email, password} = req.body;

    if(!email || !password){
        res.render('auth/signup', {errorMessage: "Please fill both fields"})
    }
    User.findOne({email})
    .then((user) =>{
        if(user){
            res.render('auth/signup', {errorMessage: "This email already exists"})
        }
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashPassword = bcrypt.hashSync(password, salt);
        console.log({email, password});

        User.create({ email, password: hashPassword })
        .then((newUser) => { 
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
    res.render('auth/login')
})
module.exports = router;