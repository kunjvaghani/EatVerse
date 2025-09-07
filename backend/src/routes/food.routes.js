const express = require('express');
const router = express.Router();
const authController= require('../controllers/auth.controller');
const foodcontroller = require('../controllers/food.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const bcrypt = require('bcrypt');
const multer = require('multer');

const upload = multer({ 
    storage: multer.memoryStorage(),
});

/*POST  /api/food */ 
router.post('/' , authMiddleware.authfoodpartnermiddleware, upload.single("video") ,  foodcontroller.createFood);


router.get('/' , authMiddleware.authusermiddleware ,  foodcontroller.getallfooditem);

router.post('/like' , authMiddleware.authusermiddleware, foodcontroller.likeFood)


router.post('/save', authMiddleware.authusermiddleware, foodcontroller.saveFood)


router.get('/save',authMiddleware.authusermiddleware,   foodcontroller.getSaveFood)

module.exports = router; 