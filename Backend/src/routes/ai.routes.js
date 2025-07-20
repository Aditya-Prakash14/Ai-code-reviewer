const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');

// Main code review endpoint
router.post('/review', aiController.reviewCode);

// Code complexity analysis
router.post('/analyze-complexity', aiController.analyzeComplexity);

// Refactoring suggestions
router.post('/suggest-refactoring', aiController.suggestRefactoring);

// Health check for AI service
router.get('/health', aiController.healthCheck);

// Get AI service capabilities
router.get('/capabilities', aiController.getCapabilities);

module.exports = router;