const express = require('express');
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/* /api/food-partner/:id */
router.get("/:id",
    authMiddleware.authusermiddleware,
    foodPartnerController.getFoodPartnerById
)

// Toggle follow/unfollow for a food partner
router.post('/:id/follow',
    authMiddleware.authusermiddleware,
    foodPartnerController.toggleFollowFoodPartner
)

module.exports = router;