const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema ({
    description: { type: String, required: true },
    price: { type: Number, min: 1, required: true },
    location: [ { type: String, required: true } ],
    publication_date: {type: Date, default: Date.now, required: true },
    image: { type: String, default: "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619186328/Service-Wall/default_services_qoqyzb.svg" },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    flag: {type: Boolean, default: true}, //is user (owner of the service) active?
    category: { 
        name: { type: String, required: true },
        image: { type: String, required: true }
    }
})

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;