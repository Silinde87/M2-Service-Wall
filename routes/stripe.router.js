require("dotenv").config();
const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Service = require("../models/Service.model");
const User = require("../models/User.model");
const stripe = require("stripe")(process.env.STRIPE_SK);

router.get("/success/:id", (req, res) => {
	const service_id = req.params.id;
	const buyer_id = req.user._id;
	//Updating DB
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
				.then( () => {
					console.log("DB UPDATED");
					res.render("stripe/success");
				})
				.catch((err) => console.error(err));
		})
		.catch((err) => console.error(err));
});


router.get("/cancel", (req, res) => {
	res.render("stripe/cancel");
});

router.post("/:id", isLoggedIn, async (req, res, next) => {
	const { id } = req.params;
	const { description, date } = req.body;

	//Back validation form
	if (!description || !date || new Date(date) <= new Date()) {
		Service.findById(id)
			.populate("user_id")
			.then((service) => {
				console.log("BAD VALIDATION");
				// res.redirect("/service/service-book");
				return res.render("service/service-book", {
					service,
					errorMessage: "Please fill all fields",
				});
			})
			.catch((err) => console.error(err));
	} else {
		const service = await Service.findById(id).populate("user_id");

		const serviceToCharge = [
			{
				price_data: {
					currency: "eur",
					product_data: {
						name: service.user_id.username,
						description: service.description,
						images: [service.image],
					},
					unit_amount: service.price * 100,
				},
				quantity: 1,
			},
		];

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: serviceToCharge,
			mode: "payment",
			success_url: `${process.env.DOMAIN}/stripe/success/${id}`,
			cancel_url: `${process.env.DOMAIN}/stripe/cancel`,
		});
		res.json({ id: session.id });
	}
});

module.exports = router;
