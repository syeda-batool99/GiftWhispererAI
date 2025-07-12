require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates gift recommendations using the Gemini API.
 * @param {object} quizAnswers - The answers from the user's quiz.
 * @returns {Promise<Array<object>>} A promise that resolves to an array of gift recommendations.
 */
async function getGiftRecommendations(quizAnswers, requestBundle = false, feelings = '') {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Destructure the quizAnswers object for clarity
  const {
    weekends,
    style,
    personality,
    entertainment,
    occasion,
    relationship,
    source,
    budget,
    surpriseReaction,
    giftPreference,
    relaxationStyle,
  } = quizAnswers;

  let prompt;
  if (requestBundle) {
    prompt = `
      You are "GiftWhisperer," an expert at creating themed gift bundles.
      Analyze the following quiz answers and generate a single JSON object for a themed gift bundle.
      The object must have a "bundleName" (e.g., "The Ultimate Relaxation Kit") and an "items" array.
      The "items" array should contain 2-4 complementary items, each with a "name" and "description".

      Quiz Answers:
      - Interests: ${entertainment}, ${weekends}
      - Personality: ${personality}, ${style}
      - Occasion: ${occasion}
      - Relationship: ${relationship}
      - How they've been feeling: ${feelings}
      - Reaction to surprises: ${surpriseReaction}
      - Prefers gifts that are: ${giftPreference}
      - Ideal way to relax: ${relaxationStyle}

      Additionally, write a short, heartfelt, personalized note (2-3 sentences) that can be sent with the gift, based on the provided feelings.

      Return a single JSON object with two keys: "gifts" (the bundle object) and "note" (the personalized message).
    `;
  } else {
    if (source === 'Suggest products from TheElegance.pk') {
      prompt = `
        You are an expert gift advisor for the website TheElegance.pk.
        Based on the following personality profile and gift context, please recommend 5 specific products that are available for purchase on https://theelegance.pk/.
        Return the answer as a JSON array. Each object must have "name", "description", and "reason" properties. For the "description", also include a plausible-looking URL to the product on the website (e.g., "https://theelegance.pk/products/product-name").

        ---
        **Personality Profile of the Recipient:**
        - Spends weekends: ${weekends}
        - Personal style: ${style}
        - Personality type: ${personality}
        - Favorite entertainment: ${entertainment}
        - Reaction to surprises: ${surpriseReaction}
        - Prefers gifts that are: ${giftPreference}
        - Ideal way to relax: ${relaxationStyle}

        **Gift Context:**
        - Occasion: ${occasion}
        - Your Relationship: ${relationship}
        - Budget: ${budget}
        - How they've been feeling lately: ${feelings}
        ---

        In addition to the gift recommendations, please write a short, heartfelt, personalized note (2-3 sentences) that can be sent with the gift, based on how the recipient has been feeling.

        Return a single JSON object with two keys: "gifts" (the array of recommendations) and "note" (the personalized message).
      `;
    } else {
      // Default to general gift ideas
      prompt = `
        You are GiftWhisperer, an expert at finding the perfect gift.
        Based on the following personality assessment and gift context, please provide 5 unique and creative gift recommendations in a JSON array format. Each object in the array should have "name", "description", and "reason" properties.

        ---
        **Personality Profile of the Recipient:**
        - Spends weekends: ${weekends}
        - Personal style: ${style}
        - Personality type: ${personality}
        - Favorite entertainment: ${entertainment}
        - Reaction to surprises: ${surpriseReaction}
        - Prefers gifts that are: ${giftPreference}
        - Ideal way to relax: ${relaxationStyle}

        **Gift Context:**
        - Occasion: ${occasion}
        - Your Relationship: ${relationship}
        - Budget: ${budget}
        - How they've been feeling lately: ${feelings}
        ---

        In addition to the gift recommendations, please write a short, heartfelt, personalized note (2-3 sentences) that can be sent with the gift, based on how the recipient has been feeling.

        Return a single JSON object with two keys: "gifts" (the array of recommendations) and "note" (the personalized message).
      `;
    }
  }

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = await response.text();

    // Clean the text to extract only the JSON part
    let jsonString = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const firstBracket = jsonString.indexOf('[');
    const firstBrace = jsonString.indexOf('{');
    
    let startIndex = -1;
    if (firstBracket !== -1 && firstBrace !== -1) {
        startIndex = Math.min(firstBracket, firstBrace);
    } else if (firstBracket !== -1) {
        startIndex = firstBracket;
    } else {
        startIndex = firstBrace;
    }

    const lastBracket = jsonString.lastIndexOf(']');
    const lastBrace = jsonString.lastIndexOf('}');
    let endIndex = -1;
    if (lastBracket !== -1 && lastBrace !== -1) {
        endIndex = Math.max(lastBracket, lastBrace);
    } else if (lastBracket !== -1) {
        endIndex = lastBracket;
    } else {
        endIndex = lastBrace;
    }

    if (startIndex !== -1 && endIndex !== -1) {
        jsonString = jsonString.substring(startIndex, endIndex + 1);
    }

    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Failed to parse cleaned JSON:", e, "Original text:", rawText);
      return requestBundle ? {} : [];
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
module.exports = { getGiftRecommendations, refineRecommendations };