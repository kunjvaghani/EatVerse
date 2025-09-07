const userModel = require('../models/user.model');
const foodPartnerModel = require('../models/food-part.model')
const foodModel = require('../models/food.model');
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');


const {v4: uuid} = require('uuid');
const authfoodpartnermiddleware = require('../middlewares/auth.middleware');
const storageService = require('../services/storage.service');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function createFood(req, res) {
    // console.log(req.foodpartner);

    // console.log(req.body);
    // console.log(req.file);

    const fileuploadResult = await storageService.uploadFile(req.file.buffer, uuid());
    console.log(fileuploadResult);

    // let us create food item 
    const foodItem = await foodModel.create({
        name : req.body.name , 
        video : fileuploadResult.url ,
        description  : req.body.description ,
        foodpartner : req.foodpartner._id
    })


    return res.status(201).json({
        message: "Food created successfully" , 
        food : foodItem
    })
} 


async function getallfooditem(req , res){
    const fooditems = await foodModel.find({});
    return res.status(200).json({
        message : "All food items fetched successfully" ,
        fooditems : fooditems
    })
}

async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food unliked successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food liked successfully",
        like
    })

}

async function saveFood(req, res) {

    const { foodId } = req.body;
    const user = req.user;

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 }
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 }
    })

    res.status(201).json({
        message: "Food saved successfully",
        save
    })

}

async function getSaveFood(req, res) {

    const user = req.user;

    const savedFoods = await saveModel.find({ user: user._id }).populate('food');

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });

}

module.exports = {
    createFood , 
    getallfooditem , 
    likeFood ,
    saveFood , 
    getSaveFood
}; 