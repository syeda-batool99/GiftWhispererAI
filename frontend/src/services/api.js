import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getGiftRecommendations = async (answers, imageAnalysis, products) => {
  try {
    const response = await axios.post(`${API_URL}/recommendations`, { answers, imageAnalysis, products });
    return response.data;
  } catch (error) {
    console.error("Error getting gift recommendations:", error);
    throw error;
  }
};

export const analyzeImage = async (imageBase64) => {
  try {
    const response = await axios.post(`${API_URL}/analyze-image`, { imageBase64 });
    return response.data;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

export const scrapeStore = async (url) => {
  try {
    const response = await axios.post(`${API_URL}/scrape-store`, { url });
    return response.data;
  } catch (error) {
    console.error("Error scraping store:", error);
    throw error;
  }
};