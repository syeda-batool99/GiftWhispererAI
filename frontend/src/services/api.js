import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getGiftRecommendations = async (answers) => {
  try {
    const response = await axios.post(`${API_URL}/recommendations`, { answers });
    return response.data;
  } catch (error) {
    console.error("Error getting gift recommendations:", error);
    throw error;
  }
};