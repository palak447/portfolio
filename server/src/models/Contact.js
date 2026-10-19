const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 80, trim: true },
    email: { type: String, required: true, maxlength: 254, trim: true, lowercase: true },
    message: { type: String, required: true, minlength: 10, maxlength: 2000, trim: true },
  },
  { timestamps: true, versionKey: false },
);

module.exports = mongoose.model('Contact', contactSchema);
