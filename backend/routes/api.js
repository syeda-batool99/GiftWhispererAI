const express = require('express');
const router = express.Router();
const { getGiftRecommendations, refineRecommendations } = require('../services/geminiService');

router.post('/recommendations', async (req, res) => {
  try {
    const { answers, requestBundle, feelings } = req.body;
    const recommendations = await getGiftRecommendations(answers, requestBundle, feelings);
    res.json(recommendations);
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