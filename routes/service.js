const express = require("express");
const router = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");
const data = require("../bin/seeds/data");
const categories = data.categories;
const { isLoggedIn } = require("../middlewares/index");
const uploader = require("../configs/cloudinary.config");

router.get("/", (req, res, next) => {});

/* Search bar route. Search a service by description */
router.get("/search", (req, res, next) => {
	const { description } = req.query;
	Service.find({ description: { $regex: `.*(?i)${description}.*` } })
		.populate("user_id")
		.then((services) => {
			res.render("service/service-list", { services, description });
		})
		.catch((err) => console.error(err));
});

/* CREATE service routes */
router.get("/create", isLoggedIn, (req, res, next) => {
	res.render("service/service-create", { categories });
});

router.post("/create", uploader.single("image"), (req, res, next) => {
	let { description, price, category, location } = req.body;

	//Back validation form
	if(!description || !price || !category || !location){
        return res.render('service/service-create', {errorMessage: "Please fill all fields"})
    }

	const user_id = req.user._id;
	//From String to array reversed format
	location = location.split(",").reverse();

	//Get category object through category name.
	categories.forEach((cat) => {
		if (cat.name === category) category = cat;
	});

	if (req.file) {
		Service.create({ description, price, location, image: req.file.path, user_id, category })
			.then(() => {
				res.redirect(`/profile`);
			})
			.catch((err) => console.error(err));
	} else {
		Service.create({ description, price, location, user_id, category })
			.then(() => {
				res.redirect(`/profile`);
			})
			.catch((err) => console.error(err));
	}
});

/* DELETE service route */
router.post("/:id/delete", isLoggedIn, (req, res, next) => {
	const service_id = req.params.id;
	const user_id = req.user._id;

	Service.findById(service_id)
		.then((service) => {
			//Extra validation. Compare service_id and user_id, if equal deletes service.
			if (JSON.stringify(service.user_id) === JSON.stringify(user_id)) {
				Service.findByIdAndRemove(service_id)
					.then(() => {
						res.redirect(`/profile`);
					})
					.catch((err) => console.error(err));
			}
		})
		.catch((err) => console.error(err));
});

/* EDIT service routes */
router.get("/:id/edit", isLoggedIn, (req, res, next) => {
	const { id } = req.params;

	Service.findById(id)
		.then((service) => {
			res.render("service/service-edit", { service, categories });
		})
		.catch((err) => console.error(err));
});

router.post("/:id/edit", uploader.single("image"), (req, res, next) => {
	let { description, price, category, location } = req.body;
	const { id } = req.params;

	//Back validation form
	if(!description || !price || !category || location == ''){
		Service.findById(id)
			.then((service) => {
				res.render('service/service-edit', {service, categories, errorMessage: "Please fill all fields"})
			})
			.catch((err) => console.error(err));
	}

	//From String to array reversed format
	location = location.split(",").reverse();

	//Get category object through category name.
	categories.forEach((cat) => {
		if (cat.name === category) category = cat;
	});
	
	if (req.file) {
		//Update if image
		Service.findByIdAndUpdate(
			req.params.id,
			{
				description,
				price,
				location,
				image: req.file.path,
				category,
			},
			{ new: true }
		)
			.then((service) => {
				res.redirect(`/profile`);
			})
			.catch((err) => console.error(err));
	} else {
		//Update if no image
		Service.findByIdAndUpdate(
			req.params.id,
			{
				description,
				price,
				location,
				category,
			},
			{ new: true }
		)
			.then(() => {
				res.redirect(`/profile`);
			})
			.catch((err) => console.error(err));
	}
});

/* BOOK Service route */
router.get("/:id/book", isLoggedIn, (req, res, next) => {
	const { id } = req.params;
	Service.findById(id)
		.populate("user_id")
		.then((service) => {
			res.render("service/service-book", service);
		})
		.catch((err) => console.error(err));
});

router.post("/:id/book", isLoggedIn, (req, res, next) => {
	//todo: Implement stripe api

	const service_id = req.params.id;
	const buyer_id = req.user._id;

	Service.findById(service_id)
		.populate("user_id")
		.then((service) => {
			const id = service._id;
			const seller_id = service.user_id._id;
			//Updating buyer's bookedServices array
			const updateBookedServices = User.findByIdAndUpdate(
				buyer_id,
				{
					$push: { bookedServices: id },
				},
				{ new: true }
			);
			//Updating seller's soldServices Array
			const updateSoldServices = User.findByIdAndUpdate(
				seller_id,
				{
					$push: { soldServices: id },
				},
				{ new: true }
			);
			Promise.all([updateBookedServices, updateSoldServices])
				.then(() => {
					res.redirect(`/profile`);
				})
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
});

/* Profile view. Rendered by user id. */
router.get("/:id", (req, res, next) => {
	const { id } = req.params;
	Service.findById(id)
		.populate("user_id")
		.then((service) => {
			res.render("service/service", service);
		})
		.catch((err) => console.error(err));
});

module.exports = router;
