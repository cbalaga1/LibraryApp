const mongoose = require('mongoose');

const surveySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
);

const Survey = mongoose.model('Survey', surveySchema);

module.exports = Survey;
