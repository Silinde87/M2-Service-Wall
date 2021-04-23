const categories = [
	{
		name: "Graphics & Design",
	},
	{
		name: "Digital Marketing",
	},
	{
		name: "Writing & Translation",
	},
	{
		name: "Video & Animation",
	},
	{
		name: "Music & Audio",
	},
	{
		name: "Programming & Tech",
	},
	{
		name: "Data",
	},
	{
		name: "Lifestyle",
	},
];

const users = [
	{
		username: "theshining",
		email: "theshining@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "romanholiday",
		email: "romanholiday@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "standbyme",
		email: "standbyme@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "grapefruit",
		email: "grapefruit@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "thebigsleep",
		email: "thebigsleep@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "sweetrolls",
		email: "sweetrolls@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "goodfellas",
		email: "goodfellas@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "voyager1",
		email: "voyager1@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "hanggliding",
		email: "hanggliding@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "forrestgump",
		email: "forrestgump@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
	{
		username: "snowstorm",
		email: "snowstorm@gmail.com",
		password: "1234",
		phone_number: "666666666",
	},
];

const services = [
	{
		name: "Logo flat design",
		description: "I will design 3 modern minimalist logo design",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["40.741895", "-73.989308"],
		image:
			"https://pixabay.com/get/g3719056961c25a8436f65894fc419f5625cf31674d9ab1f92d305074c7f45e755403d6d5a6a501e1558ad78d9c5896fe12c751f4dbec5d31bad9c8262feec43b_640.png",
		user_id: getUserId(),
		category: 
			{
				name: '',
				image:''
			}
		
	},
	{
		name: "Ritual logos",
		description: "I will create a logo design for modern brands",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["44.6054434", "33.5220842"],
		image:
			"https://pixabay.com/get/gd15125ca4c09a6f2f393e7cbbc226042d0d60ad4efb4433e597c73a23cab1ea6829158c47a8234e86ec32b3f8fc1a240b3d7f74c9a22f0bcbad3c6220f78120e_640.png",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "graphicpunk",
		description: "I will make collectable pixel art for your nft business",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["59.938732", "30.316229"],
		image:
			"https://pixabay.com/get/gf700a0ed89e5ffa921ce17ad56db31fe8e6d404cdd29412220ea01b1a3d6761b138927afa3a3fe91eb0d58d2c9b95c3ac9edb76f6f9b9de78507f70083d612b6_640.png",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "jonnthedark",
		description: "I will create a game illustration for you",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["55.7504461", "37.6174943"],
		image:
			"https://pixabay.com/get/gdf2461b4fa323777929c7add6d0ccdbacc142269a690125a28e97cb47ec859762b0dc8397d7be0614ac16948776455dc97b102554c00f763c658b0ea5825857b_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "lightninghero",
		description: "I will make you a minecraft profile picture or logo",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["55.7823547", "49.1242266"],
		image:
			"https://pixabay.com/get/g8a81a0be45c3f0e6608470881d93ce1f6387c0aec4d51f953ed1eb147c3fc78fa67f82036f857bd4d444f342a215d226_640.png",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "dntanic",
		description: "I will write an engaging SEO article on any mental health topic",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["41.6132925", "2.6576102"],
		image:
			"https://pixabay.com/get/gb785388ffeaa1d3dc39316de127ad87167332eef365550eca416eed2fb9a9d9b0e7396cdfa31219788ad2f6e04f20682c570775c8d47eb176d234d440695d95c_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "thedataman",
		description: "I will write complex mysql postgresql sql postgis queries",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["55.0282171", "82.9234509"],
		image:
			"https://pixabay.com/get/ga88627f69d0074425ad9551d90b61db22baf3f53d6c9a113b63ed01bc2310e0444447807ac549a77a79548896fb8c3a88591fc3a48317d167421d80469d023f8_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "happytime",
		description: "I will be your life coach to success and personal development",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["48.7081906", "44.5153353"],
		image:
			"https://pixabay.com/get/g990de452961236e03491d664caa726382078c3f1a5eeceaa3c97e2149862e7173e2cf1fd39d29b2f2efda49a13ad6e12433a14115e40f879ef93bf94d0d03606_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "dilamaths",
		description: "I will design a unique and responsive wordpress website with SEO",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["54.991375", "73.371529"],
		image:
			"https://pixabay.com/get/g9aa85501f13bfbee5aff243001e11c6c2676a0e41fb003a4eb949e1ff5437947ef200573823ca2422fb07478bbc009bad7e9e45ce82db27c57d98aeef54860ae_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "bluespecint",
		description: "I will create unique ideas and write your game design document",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["43.1150678", "131.8855768"],
		image:
			"https://pixabay.com/get/g04d1b507b98cabf4da78af045729c7cd1336d8d868fa636ee28aed11d994ad6439d0add2f011f3a248a1ff42a031278c1b79d500b7f7a0b652533f53a815627f_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "mairagamer",
		description: "I will be your professional game developer for unity mobiles games",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["43.5854823", "39.723109"],
		image:
			"https://pixabay.com/get/gb06b3e3af9e9a1adb77ee808c9ef4f4cdbb3862db59500e5fddcb8128730b7dfd412585b56557a2fc8f5753f39b2f9ca683d86a1942980ea49538ed68950c626_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "stephandev",
		description: "I will blueprint a game for you in unreal engine",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["47.2213858", "39.7114196"],
		image:
			"https://pixabay.com/get/gac01ad4d458297204ba21963683962c560e779153f448b6cfb961e4e502e3797be274dfa9cba5462cab8de281f16ba9c2b7fae83fbf687fb3104dc181b10d004_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "siasharma",
		description: "I will edit your youtube videos professionally and creatively",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["63.3233807", "97.0979974"],
		image:
			"https://pixabay.com/get/g02b6c03ab02a73ca8d15d552cfaf58d6461823859c592a77ee2a4803fc4d21d8dc4be59e77379a8ff928ceecae38911f7126c9cfba20790de49483473f3e2404_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
	{
		name: "julia9291",
		description: "I will record professional violin or strings parts in my studio",
		price: Math.floor(Math.random() * 500) + 1,
		location: ["62.027287", "129.732086"],
		image:
			"https://pixabay.com/get/g8499fc50137eef1831a6163e6c9ad91a187234a3cd9f3e3cffcbe3b7ef5bd2a70a50864f27a0ea56798b987883053d9323433030ff239792a929c5736fd9996f_640.jpg",
		user_id: getUserId(),
		category_id: getCategoryId(),
	},
];

const reviews = [
	{
		username: "cheesesticks",
		description:
			"Generally good with detail and checks work thoroughly, but there have been one or two minor errors in work presented",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "greatsquare",
		description:
			"Able to establish a principle, or work out a rule, or suggest a reason for failure or success.",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "muffin",
		description: "Always succeeds in explaining ideas clearly. Others find a easy to understand.",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "thegreenmile",
		description: "Meticulous in keeping the workplace clean and tidy",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "astronout",
		description: "outstanding artistic or craft skills, bringing creativity and originality to the task.",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "hotelrwanda",
		description: "Regularly produces creative, original ideas, plans, products or methods",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "alligator",
		description: "Responds to setbacks or adversity with redoubled vigour",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "inception",
		description: "Understands the importance of confidentiality, and can always be trusted",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
	{
		username: "baritone",
		description: "Always completes tasks to a high standard.",
		rate: Math.floor(Math.random() * 5) + 1,
		user_id: getUserId(),
	},
];

const getCategory = (cat) => {

	return categories[Math.random];
}

const categories = [
	{
		name: 'Design',
		image: ''
	}
]

//['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio', 'Programming & Tech', 'Data', 'Lifestyle']

/*
    reviews: [ {
        username: {type: String, required: true },
        description: { type: String, required: true },
        rate: { type: number, min: 0, max: 5, required: true },
        date: { type: Date, default: 'timeStamp', required: true }, //maybe not a field   
    } ]	
	*/