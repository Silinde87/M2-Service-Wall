const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    
    username: { type: String },
    email: { type: String, unique: true },
    password: { type: String, minLength: 6 },
    phone_number: { type: String },
    rate: { type: Number, min: 0, max: 5, default: 0 },
    image: { type: String, default: "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619125766/Service-Wall/user_avatar_xyyphc.png" },
    linkedIn_id: { type: String },
    google_id: { type: String },
    bookedServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    soldServices: [{ type: Schema.Types.ObjectId, ref: 'Service' }],
    reviews: [ {
        username: { type: String, required: true },
        description: { type: String, required: true },
        rate: { type: Number, min: 0, max: 5, required: true },
        date: { type: Date, default: Date.now, required: true }, //maybe not a field   
    } ]
})

const User = mongoose.model('User', userSchema);

module.exports = User;