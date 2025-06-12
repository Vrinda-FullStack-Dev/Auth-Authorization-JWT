const mongoose = require("mongoose");
const campaignSchema = require("./Campaign.schema");

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
