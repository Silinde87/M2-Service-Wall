const express = require('express');
const router  = express.Router();
const{ isLoggedIn } = require('../middlewares/index')

router.get('/', isLoggedIn, (req, res, next) => {
    res.render('auth/profile', {user: req.user})
});


module.exports = router;