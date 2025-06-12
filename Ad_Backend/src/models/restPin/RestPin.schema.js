const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResetPinSchema = new Schema({
  pin: {//so that 0 can also be incorporated in starting
    type: String,
    maxlength: 6,
    minlength: 6,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = {
  ResetPinSchema: mongoose.model("Reset_pin", ResetPinSchema),
};
