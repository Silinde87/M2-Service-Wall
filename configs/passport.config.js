const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model')
const flash = require('connect-flash')

module.exports = (app) =>{
    passport.serializeUser((user, cb) =>{ cb(null, user._id)});
    passport.deserializeUser((id, cb) =>{
        User.findById(id)
        .then((user) => cb(null, user))
        .catch(error => cb(error))
    })
    app.use(flash())

    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, (req, email, password, next ) =>{
        User.findOne({ email })
        .then(user =>{
            if(!user){
                return next(null, false, {message: 'Wrong email or password. Please try again.'})
            }
            if(bcrypt.compareSync(password, user.password)){
                return next(null, user)
            }else{
                return next(null, false, {message: 'Wrong email or password. Please try again.'})
            }
        })
        .catch(error => next(error))
    }))
    // Google strategy - Social login
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },  (accessToken, refreshToken, profile, cb) => {
        console.log('Google account:', profile);
      User.findOne({ google_id: profile.id})
        .then(user => {
          if (user) {
            cb(null, user);
            return;
          }
          User.create({ google_id: profile.id, email: profile. _json.email, username: profile.displayName, image: JSON.parse(profile._raw).picture})
            .then(newUser => {
                console.log(newUser)

              cb(null, newUser)
            })
            .catch(error => cb(error))
        })
        .catch(error => cb(error))
    }
    ))
    app.use(passport.initialize());
    app.use(passport.session());
}
