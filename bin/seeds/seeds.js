const User = require("../models/User.model");
const Service = require("../models/Service.model");
const mongoose = require("mongoose");
const DB_URL = "mongodb://localhost/m2-service-wall";

const data = require("../seeds/data");
const users = data.users;
const services = data.services;

mongoose
	.connect(DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Connected to database. Creating seed info");
		//Seed the users first, then comment.
		User.insertMany(users)
			.then((users) => {
				console.log(`${users.length} users inserted`);
			})
			.then(() => {
				mongoose.connection.close();
			});
		//Get the users id and then seed the services
		// Service.insertMany(services)
		// 	.then((services) => {
		// 		console.log(`${services.length} users inserted`);
		// 	})
		// 	.then(() => {
		// 		mongoose.connection.close();
		// 	});
	})
	.catch((error) => console.error(error));
