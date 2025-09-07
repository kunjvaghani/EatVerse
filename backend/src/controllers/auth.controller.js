const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/food-part.model')
const foodModel = require('../models/food.model');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();



async function registerUser(req, res) {

    const { fullName, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashpass = await bcrypt.hash(password, 10);
    if (!hashpass) {
        return res.status(500).json({
            message: "Something went wrong"
        })
    }

    const user = await userModel.create({
        fullName,
        email,
        password: hashpass
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)
    console.log(user)
    res.status(201).json({
        message: "User registered successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "User does not exist"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Wrong password"
        })
    }
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })

}

async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        message: "User logged out successfully"
    })

}

async function foodPartnerRegister(req , res) {

    const { name, email, password  , address , phone , contactname} = req.body;

    const isemailexist = await foodPartnerModel.findOne({ email })

    if (isemailexist) {
        return res.status(400).json({
            message: "Food_partner already exists",
        })
    }

    const hashpass = await bcrypt.hash(password, 10);

    const foodpartner = foodPartnerModel.create({
        name,
        email,
        password: hashpass, 
        address, 
        phone, 
        contactname
    })

    const token = jwt.sign({
        id: foodpartner._id,
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food-Partner registered successfully",
        user: {
            _id: foodpartner._id,
            RestaurantName: foodpartner.name,
            email: foodpartner.email,
            contactname: foodpartner.contactname,
            phone: foodpartner.phone,
            address: foodpartner.address
        }
    })


}

async function foodPartnerLogin(req , res) {
    const { email, password } = req.body;

    const foodpartner = await foodPartnerModel.findOne({ email });
    if (!foodpartner) {
        return res.status(400).json({
            message: "Food-Partner does not exist"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, foodpartner.password);
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Wrong password"
        })
    }
    const token = jwt.sign({
        id: foodpartner._id,
    }, process.env.JWT_SECRET)
    res.cookie("token", token)
    res.status(200).json({
        message: "Food-Partner logged in successfully",
        user: {
            _id: foodpartner._id,
            NameofPartner: foodpartner.name,
            email: foodpartner.email
        }
    })
}

async function foodPartnerLogout(req , res) {
    res.clearCookie("token")
    res.status(200).json({
        message : "Food-Partner logout successfully"
    })
}

async function getallfoodpartner(req , res) {
    try {
        const foodpartners = await foodPartnerModel.find({});
        res.status(200).json({
            foodpartners
        })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser , 
    foodPartnerLogin , 
    foodPartnerLogout , 
    foodPartnerRegister , 
    getallfoodpartner
};