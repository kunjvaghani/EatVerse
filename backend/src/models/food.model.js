const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    } , 
    description:{
        type : String ,
    },
    foodpartner:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "food-partner",
    },
    likeCount: {
        type: Number,
        default: 0
    },
    savesCount: {
        type: Number,
        default: 0
    }  
}, {
    timestamps: true
})

const foodModel = mongoose.model("food" , foodSchema);
module.exports = foodModel;