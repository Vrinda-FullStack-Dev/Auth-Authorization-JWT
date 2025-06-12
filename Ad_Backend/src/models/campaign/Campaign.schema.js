const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  content: {
    heading: String,
    subheading: String,
    body: String,
    imageUrl: String,
    callToAction: String,
  },
  platform: {
    type: [String],
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  targetAudience: {
    location: String,
    ageRange: String,
    interests: [String],
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["draft", "pending", "running", "completed", "cancelled"],
    default: "draft",
  },
  performance: {
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    conversions: { type: Number, default: 0 },
  },
}, { timestamps: true });

module.exports = campaignSchema;
