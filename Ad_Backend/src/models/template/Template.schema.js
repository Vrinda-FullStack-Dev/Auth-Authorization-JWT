
const mongoose=require("mongoose");
const ElementSchema = new mongoose.Schema({
  type: { type: String, enum: ['text', 'image', 'button', 'shape'], required: true },
  content: { type: String },
  font: { type: String },
  fontSize: { type: Number },
  color: { type: String },
  position: {
    x: Number,
    y: Number
  },
  size: {
    width: Number,
    height: Number
  },
  zIndex: { type: Number }
});

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [String],
  backgroundColor: { type: String, default: '#FFFFFF' },
  elements: [ElementSchema], 
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = TemplateSchema;
