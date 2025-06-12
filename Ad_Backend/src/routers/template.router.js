const express = require("express");
const router = express.Router();
const Template = require("../models/template/Template.model"); 

// Create template
router.post("/", async (req, res) => {
  try {
    const { name, layout, imageUrl } = req.body;

    const template = new Template({
      name,
      layout,
      imageUrl,
    });

    const result = await template.save();
    res.json({ status: "success", message: "Template created", template: result });
  } catch (err) {
    console.error("Template creation failed:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Get all templates
router.get("/", async (req, res) => {
  try {
    const templates = await Template.find();
    res.json({ status: "success", templates });
  } catch (err) {
    console.error("Failed to fetch templates:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

module.exports = router;
