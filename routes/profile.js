const express = require('express');
const uploader = require('../configs/cloudinary.config')
const router  = express.Router();
const User = require('../models/User.model')
const{ isLoggedIn } = require('../middlewares/index');
const Service = require('../models/Service.model');

router.get('/', isLoggedIn, (req, res, next) => {
    Service.find({user_id: req.user.id})
    .populate("user_id")
    .then(services => {
        User.findById(req.user.id)
        .populate("soldServices bookedServices")
        .then((userServices) =>{
            console.log(userServices)
            res.render('auth/profile', {user: req.user, services, userServices})
        })
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
router.post('/:id/delete', (req, res, next) =>{
    User.findByIdAndRemove(req.params.id)
    .then(() =>{
        Service.updateMany({user_id: req.params.id}, {flag: false})
        .then(() =>{
            res.redirect('/')
        })
    })
})
router.post('/:id', uploader.single('image'), isLoggedIn, (req, res, next) =>{
    const{username, phone_number, image} = req.body;
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
})



module.exports = router;