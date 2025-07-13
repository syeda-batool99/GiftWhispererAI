const express = require('express');
const router = express.Router();
const { getGiftRecommendations, refineRecommendations, analyzeImage } = require('../services/geminiService');

router.post('/recommendations', async (req, res) => {
  try {
    const { answers, imageAnalysis, products } = req.body;
    const recommendations = await getGiftRecommendations(answers, imageAnalysis, products);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/analyze-image', async (req, res) => {
  try {
    const { imageBase64 } = req.body;
    const analysis = await analyzeImage(imageBase64);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/chat', async (req, res) => {
  try {
    const { conversationHistory } = req.body;
    const recommendations = await refineRecommendations(conversationHistory);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;