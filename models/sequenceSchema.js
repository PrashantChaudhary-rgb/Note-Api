const mongoose = require('mongoose');
const sequenceSchema = new mongoose.Schema({
    model: String,
    field: String,
    count: { type: Number, default: 0 },
  });

module.exports = sequenceSchema;