// routers/dashboard.js
const express = require("express");
const router = express.Router();
const Campaign = require("../models/campaign/Campaign.model");

const { userAuthorization } = require("../middlewares/authorization.middleware");


router.get("/", userAuthorization, async (req, res) => {
  try {
    const userId = req.user.id; // extracted from JWT
    const campaigns = await Campaign.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      message: `Welcome, ${req.user.name}`,
      campaigns,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/campaigns", userAuthorization, async (req, res) => {
  try {
    // From your auth middleware  // Authorization middleware se mila user ka ID
    const userId = req.userId || req.user._id;
    const campaignData = req.body; // Client se aaya hua data jo campaign banane ke liye


    // Add user id to campaign owner (optional)
    //Campaign ke andar user ka ID save kar rahe hain (kaun bana raha hai)
    campaignData.createdBy = userId;

    // // Mongoose model se new campaign create karna
    const newCampaign = new Campaign(campaignData);

    // // Database mein save karna
    const savedCampaign = await newCampaign.save();

    
    // Client ko success message ke saath response bhejna
    res.status(201).json({
      status: "success",
      message: "Campaign created successfully",
      campaign: savedCampaign,
    });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({
      status: "error",
      message: "Unable to create campaign",
    });
  }
});


module.exports = router;
