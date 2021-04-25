const express = require('express');
const router  = express.Router();
const User = require('../models/User.model')
const{ isLoggedIn } = require('../middlewares/index');
const Service = require('../models/Service.model');

router.get('/', isLoggedIn, (req, res, next) => {
    console.log(req.user.id);
    Service.find({user_id: req.user.id})
    .populate("user_id")
    .then(services => {
        console.log(services);
        res.render('auth/profile', {user: req.user, services})

    })
    
});
router.get('/:id/edit', isLoggedIn, (req, res, next) =>{
    User.findById(req.params.id)
    .then(user => {
        res.render('auth/edit', user)
    })
    .catch(error => {
        next('error')
        console.error(error)
    })
})
router.post('/:id', isLoggedIn, (req, res, next) =>{
    const{username, phone_number} = req.body;
    User.findByIdAndUpdate(req.params.id, {username, phone_number})
    .then(() => {
        res.redirect('/profile')
    })
})





module.exports = router;