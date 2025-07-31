const Survey = require('../models/Survey');

// Create a new survey
const createSurvey = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newSurvey = new Survey({ title, description });
    const savedSurvey = await newSurvey.save();
    res.status(201).json(savedSurvey);
  } catch (error) {
    res.status(500).json({ message: 'Error creating survey', error });
  }
};

// Get all surveys
const getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving surveys', error });
  }
};

// Update a survey by ID
const updateSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const updatedSurvey = await Survey.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.status(200).json(updatedSurvey);
  } catch (error) {
    res.status(500).json({ message: 'Error updating survey', error });
  }
};

// Delete a survey by ID
const deleteSurvey = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSurvey = await Survey.findByIdAndDelete(id);
    if (!deletedSurvey) {
      return res.status(404).json({ message: 'Survey not found' });
    }
    res.status(200).json({ message: 'Survey deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting survey', error });
  }
};

module.exports = {
  createSurvey,
  getSurveys,
  updateSurvey,
  deleteSurvey,
};
