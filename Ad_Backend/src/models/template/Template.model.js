const mongoose = require("mongoose");
const templateSchema = require("./Template.schema");

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;
