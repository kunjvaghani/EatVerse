const foodPartnerModel = require('../models/food-part.model');
const foodModel = require('../models/food.model');
const userModel = require('../models/user.model');

async function getFoodPartnerById(req, res) {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId)
    const foodItemsByFoodPartner = await foodModel.find({ foodpartner: foodPartnerId })

    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not found" });
    }

    // Determine if requesting user follows this partner
    let isFollowing = false;
    try {
        if (req.user) {
            isFollowing = Array.isArray(req.user.followingFoodPartners) && req.user.followingFoodPartners.some(fpId => fpId.toString() === foodPartnerId.toString());
        }
    } catch (err) {
        // ignore
    }

    res.status(200).json({
        message: "Food partner retrieved successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner,
            isFollowing
        }

    });
}

async function toggleFollowFoodPartner(req, res) {
    // user must be authenticated (authusermiddleware)
    const user = req.user;
    const partnerId = req.params.id;

    if (!user) return res.status(401).json({ message: 'Login required' });

    try {
        const already = user.followingFoodPartners && user.followingFoodPartners.some(id => id.toString() === partnerId.toString());
        if (already) {
            // unfollow
            user.followingFoodPartners = user.followingFoodPartners.filter(id => id.toString() !== partnerId.toString());
        } else {
            // follow
            user.followingFoodPartners = user.followingFoodPartners || [];
            user.followingFoodPartners.push(partnerId);
        }

        await user.save();

        return res.status(200).json({ message: already ? 'Unfollowed' : 'Followed', isFollowing: !already });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Could not toggle follow' });
    }
}

module.exports = {
    getFoodPartnerById , 
    toggleFollowFoodPartner
};