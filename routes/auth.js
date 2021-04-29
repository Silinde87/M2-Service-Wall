// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const passport = require("passport");
// const saltRounds = 10;
// const User = require("../models/User.model");
// const ensureLogin = require("connect-ensure-login");
// const { isLoggedOut } = require("../middlewares/index");
// const async = require("async");
// const crypto = require("crypto");
// const transporter = require('../configs/nodemailer.config');
// const flash = require('express-flash');
//const smtpTransport = require("nodemailer-smtp-transport");
//const { constants } = require("buffer");
//router.use(flash())

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const saltRounds = 10;
const User = require('../models/User.model')
//const ensureLogin = require('connect-ensure-login');
const { isLoggedOut } = require('../middlewares/index')
//SIGNUP routes
router.get('/signup', isLoggedOut, (req, res) => {
    res.render('auth/signup')
});
router.post('/signup', (req, res, next) =>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        return res.render('auth/signup', {errorMessage: "Please fill all fields"});
    }
    User.findOne({ $or: [ { username },{ email } ] })
    .then((user) =>{
        if(user){
            res.render('auth/signup', {errorMessage: "This user already exists"});
        }
        //Encrypting the password
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashPassword = bcrypt.hashSync(password, salt);
        User.create({ username, email, password: hashPassword })
        .then((newUser) => {
            req.login(newUser, (error) => {
                if(error) next(error);
                return res.redirect('/profile')
            });
        })
        .catch((error) =>{
            console.error(error);
            res.render('auth/signup', {errorMessage: "Ups! Something went wrong. Please try again"});
        });
    });
});
//LOGIN routes
router.get('/login', isLoggedOut, (req, res) =>{
    res.render('auth/login', {errorMessage: req.flash('error')[0]});
});
router.post('/login', passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
}));
//LOGOUT route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});
//SOCIAL routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get("/google/callback", passport.authenticate('google', {
    successRedirect: "/profile",
    failureRedirect: "/auth/login"
}));
module.exports = router;


// router.get("/forgot", (req, res) => {
//   res.render("auth/forgot", { user: req.user });
// });

// router.post("/forgot", (req, res, next) => {
//   async.waterfall(
//     [
//       function (done) {
//         crypto.randomBytes(20, function (err, buf) {
//           const token = buf.toString("hex");
//           done(err, token);
//         });
//       },
//       function (token, done) {
//         User.findOne({ email: req.body.email }, (err, user) => {
//           if (!user) {
//             req.flash("error", "No account with that email address exists.");
//             return res.redirect("/forgot");
//           }

//           user.resetPasswordToken = token;
//           user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

//           user.save(function (err) {
//             done(err, token, user);
//           });
//           console.log("user found", user.email);
//         });
//       },
//       function (token, user, done) {
//         // const transport = nodemailer.createTransport(smtpTransport, {
//         //   service: "Gmail",
//         //   auth: {
//         //     xoauth2: xoauth2.createXOAuth2Generator,
//         //     user: "abc@gmail.com",
//         //   },
//         // });
//         let mailOptions = {
//           to: user.email,
//           from: "taia.makh@gmail.com",
//           subject: "Node.js Password Reset",
//           text:
//             "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
//             "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
//             "http://" +
//             req.headers.host +
//             "/reset/" +
//             token +
//             "\n\n" +
//             "If you did not request this, please ignore this email and your password will remain unchanged.\n",
//         };

//         transporter.sendMail(mailOptions, (err) => {
//           req.flash(
//             "info",
//             "An e-mail has been sent to " +
//               user.email +
//               " with further instructions."
//           );
//           done(err, "done");
//         });
//       },
//     ],
//     function (err) {
//       if (err) return next(err);
//       res.redirect("/forgot");
//     }
//   );
// });
