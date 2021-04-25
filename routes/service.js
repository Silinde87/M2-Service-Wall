const express = require('express');
const router  = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");

router.get('/', (req, res, next) => {
    
});

/* Search bar route. Search a service by description */
router.get('/search', (req, res, next) => {
    const { description } = req.query;
    Service.find({description:  {$regex : `.*(?i)${description}.*`}})
        .populate("user_id")
        .then((services) => {
            res.render("service/service-list", { services, description });
		})
		.catch((err) => console.error(err));
})

/* Profile view. Rendered by user id. */
router.get('/:id', (req, res, next) => {
    const { id } = req.params;
    Service.findById(id)
        .populate("user_id")
        .then((service) => {
            console.log(service)
            res.render('service/service', service);
        })
        .catch((err) => console.error(err));
})

module.exports = router;