require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates an image using the Gemini API.
 * @param {string} prompt - The prompt for the image generation.
 * @returns {Promise<string>} A promise that resolves to the URL of the generated image.
 */
async function generateImage(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const imagePrompt = `A high-quality, photorealistic image of ${prompt}, on a clean, minimalist background.`;
  try {
    const result = await model.generateContent(imagePrompt);
    const response = await result.response;
    // This is a placeholder. In a real application, you would use a dedicated image generation model
    // and get a URL back. For this example, we'll use a placeholder image.
    return `https://picsum.photos/seed/${Math.random()}/200/300`;
  } catch (error) {
    console.error('Error generating image from Gemini:', error);
    return "/src/assets/gift.png"; // Fallback image
  }
}

/**
 * Analyzes an image using the Gemini API.
 * @param {string} imageBase64 - The base64 encoded image.
 * @returns {Promise<object>} A promise that resolves to an object containing the image analysis.
 */
async function analyzeImage(imageBase64) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "Analyze the provided image and describe the person's facial features, dressing style, and overall appearance in a short paragraph.";
  const image = {
    inlineData: {
      data: imageBase64,
      mimeType: "image/jpeg",
    },
  };

  try {
    const result = await model.generateContent([prompt, image]);
    const response = await result.response;
    const text = await response.text();
    return { analysis: text };
  } catch (error) {
    console.error('Error analyzing image from Gemini:', error);
    throw new Error('Failed to analyze image.');
  }
}

/**
 * Generates gift recommendations using the Gemini API.
 * @param {object} quizAnswers - The answers from the user's quiz.
 * @param {object} imageAnalysis - The analysis of the uploaded image.
 * @param {Array<object>} products - The products from the user's store.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of gift recommendations.
 */
async function getGiftRecommendations(quizAnswers, imageAnalysis = null, products = null) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Destructure the quizAnswers object for clarity
  const {
    '1': occasion,
    '2': relationship,
    '3': gender,
    '4': personality,
    '5': freeTime,
    '6': communicationStyle,
    '7': makesThemSmile,
    '8': giftPreference,
    '9': freeWeekend,
    '10': aesthetic,
    '11': color,
    '12': knownLength,
    '13': additionalInfo
  } = quizAnswers;

  let prompt = `
    You are GiftWhisperer, an expert at finding the perfect gift.
    Based on the following personality assessment and gift context, please provide 3 unique and creative gift recommendations in a JSON array format. Each object in the array should have "name", "description", and "reason" properties.
  `;

  if (products) {
    prompt += `
      Please select gifts exclusively from the following list of products:
      ${JSON.stringify(products, null, 2)}
      If no suitable match is found, return an empty array for the "gifts" key.
    `;
  }

  prompt += `
    ---
    **Gift Context:**
    - Occasion: ${occasion}
    - Your Relationship: ${relationship}
    - Gender: ${gender}
    - How long you've known them: ${knownLength}
    - Additional Info: ${additionalInfo}
  `;

  if (imageAnalysis) {
    prompt += `
    **Image Analysis:**
    ${imageAnalysis.analysis}
    `;
  }

  prompt += `
    **Personality Profile of the Recipient:**
    - Personality: ${personality?.join(', ')}
    - Spends free time: ${freeTime}
    - Communication style: ${communicationStyle}
    - What makes them smile: ${makesThemSmile}
    - Prefers gifts that are: ${giftPreference}
    - Ideal weekend: ${freeWeekend}
    - Aesthetic: ${aesthetic}
    - Their color: ${color}
    ---

    Return a single JSON object with a "gifts" key containing the array of recommendations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    // Clean the text to extract only the JSON part
    let jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const firstBrace = jsonString.indexOf('{');
    const lastBrace = jsonString.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
        jsonString = jsonString.substring(firstBrace, lastBrace + 1);
    }

    try {
      const parsed = JSON.parse(jsonString);
      const gifts = parsed.gifts || [];

      if (products && gifts.length === 0) {
        return { gifts: [], noMatch: true, imageAnalysis };
      }

      // Generate images for each gift
      const giftsWithImages = await Promise.all(gifts.map(async (gift) => {
        if (gift.image) return gift; // If image is already provided by the dummy API
        const imageUrl = await generateImage(gift.name);
        return { ...gift, image: imageUrl };
      }));

      return { gifts: giftsWithImages, imageAnalysis };
    } catch (e) {
      console.error("Failed to parse cleaned JSON:", e, "Original text:", rawText);
      return { gifts: [], imageAnalysis: null };
    }
  } catch (error) {
    console.error('Error getting recommendations from Gemini:', error);
    throw new Error('Failed to generate gift recommendations.');
  }
}

/**
 * Refines gift recommendations based on a conversation history.
 * @param {Array<object>} conversationHistory - The history of the conversation.
 * @returns {Promise<Array<object>>} A promise that resolves to a new array of gift recommendations.
 */
async function refineRecommendations(conversationHistory) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
    You are a helpful assistant refining gift recommendations.
    Analyze the conversation history provided below, which includes the initial recommendations and the user's feedback.
    Based on the user's latest message, generate a new, refined list of 5 gift ideas in a JSON array format.
    Each object in the array must have "name", "description", and "reason" properties.
    Consider the user's preferences for price, style, etc., to adjust the suggestions.

    Conversation History:
    ${JSON.stringify(conversationHistory, null, 2)}

    Return only the JSON array of the new recommendations.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();
    
    // Clean the text to extract only the JSON part
    let jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    const startIndex = jsonString.indexOf('[');
    const endIndex = jsonString.lastIndexOf(']');

    if (startIndex !== -1 && endIndex !== -1) {
        jsonString = jsonString.substring(startIndex, endIndex + 1);
    }

    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse cleaned JSON:", e, "Original text:", rawText);
      return [];
    }
  } catch (error) {
    console.error('Error refining recommendations from Gemini:', error);
    throw new Error('Failed to refine gift recommendations.');
  }
}
module.exports = { getGiftRecommendations, refineRecommendations, analyzeImage };