const express = require('express');
const router = express.Router();
const authController= require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const bcrypt = require('bcrypt');


router.post('/user/register' , authController.registerUser);
router.post('/user/login' , authController.loginUser);
router.post('/user/logout' , authController.logoutUser);

router.post('/food-partner/register' , authController.foodPartnerRegister);
router.post('/food-partner/login' , authController.foodPartnerLogin);
router.post('/food-partner/logout' , authController.foodPartnerLogout);
router.get('/all/food-partner' , authController.getallfoodpartner);
router.get('/all/following' , authMiddleware.authusermiddleware , authController.getfoodpartnerfollowing);

module.exports = router;
