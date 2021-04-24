const express = require('express');
const router  = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");

router.get('/', (req, res, next) => {
    
});

router.get('/search', (req, res, next) => {
    const { description } = req.query;
    Service.find({description:  {$regex : `.*${description}.*`}})
        .populate("user_id")
        .then((services) => {
            res.render("service/service-list", { services, description });
		})
		.catch((err) => console.error(err));
})

module.exports = router;