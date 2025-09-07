const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connextDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=> {
        console.log("Error while connecting to MongoDB", err);
    })
}

module.exports = connextDB;