const jwt = require('jsonwebtoken');

const foodModel = require('../models/food.model');
const foodPartnerModel = require('../models/food-part.model');
const userModel = require('../models/user.model');

const dotenv = require('dotenv');
dotenv.config();


async function authfoodpartnermiddleware(req , res , next){
    const token = req.cookies.token;
    

    if(!token){   
        return res.status(401).json({
            message : "Plz login first"
        })
    }
    // console.log("this is the token of auth.middleware.js file : " , token);

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)

        const foodpartner = await foodPartnerModel.findById(decoded.id);
        if(!foodpartner){
            return res.status(401).json({
                message : "Food-Partner not found"
            })
        }
 
        req.foodpartner = foodpartner;


        next();

    }catch(err){
        return res.status(401).json({
            message : "Invalid token"
        })
    }


}

async function authusermiddleware(req , res , next){
    const token = req.cookies.token;    

    if(!token){
        return res.status(401).json({
            message : "Plz login first"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        // if(!decoded){
        //     return res.status(401).json({
        //         message : "Invalid token"
        //     })
        // }

        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message : "User not found"
            })
        }

        req.user = user;

        next();

    }catch(err){
        return res.status(401).json({
            message : "Invalid token from catch block"
        })
    }
}
module.exports = {
    authfoodpartnermiddleware , 
    authusermiddleware
};