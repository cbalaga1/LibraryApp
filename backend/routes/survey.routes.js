const express = require('express');
const router = express.Router();

const {
  createSurvey,
  getSurveys, 
  updateSurvey,
  deleteSurvey
} = require('../controllers/survey.controller');

// POST /api/surveys → create a new survey
router.post('/surveys', createSurvey);

// GET /api/surveys → get all surveys
router.get('/surveys', getSurveys); 
// PUT /api/surveys/:id → update a survey
router.put('/surveys/:id', updateSurvey);

// DELETE /api/surveys/:id → delete a survey
router.delete('/surveys/:id', deleteSurvey);

module.exports = router;
