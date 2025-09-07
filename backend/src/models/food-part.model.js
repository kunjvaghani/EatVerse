const mongoose = require('mongoose')

const foodPartnerSchema = mongoose.Schema({
    name: { // for reastaurant name 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactname: { // for contact person name
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    }
}, {
    timestamp: true
})

const foodPartnerModel = mongoose.model("food-partner", foodPartnerSchema);
module.exports = foodPartnerModel;