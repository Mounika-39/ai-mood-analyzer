const axios = require("axios");


const analyzeMood = async (text) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
      }
    );

    const result = response.data[0];

    // HuggingFace returns array like:
    // [{ label: 'LABEL_0', score: 0.98 }, ...]

    let highest = result.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );

    let mood = "Neutral";

    if (highest.label === "LABEL_0") mood = "Negative";
    if (highest.label === "LABEL_1") mood = "Neutral";
    if (highest.label === "LABEL_2") mood = "Positive";

    return {
      mood,
      confidence: highest.score,
    };
  } catch (error) {
    console.error("AI Error:", error.response?.data || error.message);
    return {
      mood: "Neutral",
      confidence: 0.5,
    };
  }
};

module.exports = analyzeMood;
