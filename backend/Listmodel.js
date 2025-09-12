
const axios = require("axios");

async function listModels() {
  try {
    const res = await axios.get(
      "https://generativelanguage.googleapis.com/v1/models",
      { params: { key: process.env.GOOGLE_PALM_API_KEY } }
    );
    console.log("✅ Available models:");
    res.data.models.forEach((m) => console.log(m.name));
  } catch (err) {
    console.error("❌ Error listing models:", err.response?.data || err.message);
  }
}

listModels();


