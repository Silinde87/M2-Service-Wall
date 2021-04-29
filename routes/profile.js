const express = require('express');
const uploader = require('../configs/cloudinary.config')
const router  = express.Router();
const User = require('../models/User.model')
const{ isLoggedIn } = require('../middlewares/index');
const Service = require('../models/Service.model');

//PROFILE view
router.get('/', isLoggedIn, (req, res, next) => {
    Service.find({user_id: req.user.id})
    .populate("user_id")
    .then(services => {
        User.findById(req.user.id)
        .populate({
            path: "soldServices bookedServices",
            populate:{
                path: "user_id",
                model: "User"
            }
        })
        .then((userServices) =>{
            res.render('auth/profile', {user: req.user, services, userServices})
        })
    })
    
});

//EDIT PROFILE route
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

//DELETE PROFILE route
router.post('/:id/delete', (req, res, next) =>{
    User.findByIdAndRemove(req.params.id)
    .then(() =>{
        Service.updateMany({user_id: req.params.id}, {flag: false})
        .then(() =>{
            res.redirect('/')
        })
    })
})

//REVIEW routes
router.get('/:id/review/:service_id', isLoggedIn, (req, res, next) => {
    const { id, service_id } = req.params;
    Service.findById(service_id)
    .populate('user_id')
    .then((service) => {
        res.render('review', service);
    })
    .catch(error => next(error));
})
router.post('/:id/review', isLoggedIn, (req, res, next) => {
    const { rate, username, description } = req.body;
    // Find the "seller" user
    User.findById(req.params.id)
    .then((user) => {
        // Calculate the new user media rate
        let totalRates = (user.reviews.length + 1)*1;
        let updatedRate;
        if(user.rate * 1 === 0) updatedRate = rate*1;
        else{
            updatedRate = user.reviews.reduce( (acc, el) => acc + el.rate, rate*1 ) / totalRates;
        }
        // Update new rate and pushes a review
        User.findByIdAndUpdate(
            req.params.id,
            {
                rate: updatedRate.toFixed(1) * 1,
                $push: {
                    reviews: {
                        username,
                        description,
                        rate
                    }
                }
            },
            { new: true }
        )
        .then((user) => {
            res.redirect('/');
        })
    })
    .catch(error => next(error)); 
})

//EDIT PROFILE route
router.post('/:id', uploader.single('image'), isLoggedIn, (req, res, next) =>{
    const{username, phone_number, image} = req.body;
    //validation backend, if username exists & !username
    if(!username){
        return res.render('auth/edit', {errorMessage: "Fill username field"})
    }
    User.find({})
    .then((users)=>{
        users.forEach((user) =>{
            if(username === user.username){
                return res.render('auth/edit', {errorMessage: "This username already exists"})
            }else{
                if(req.file){
                    User.findByIdAndUpdate(req.params.id, {username, phone_number, image: req.file.path}, {new:true})
                    .then(() => {
                        res.redirect('/profile')
                    })
                    .catch(error => next(error))
                }else {
                    //Update if no image
                    User.findByIdAndUpdate(req.params.id, {username, phone_number}, {new:true})
                        .then(() => {
                            res.redirect('/profile');
                        })
                        .catch((err) => console.error(err));
                }
            }
        })
    })
})



module.exports = router;