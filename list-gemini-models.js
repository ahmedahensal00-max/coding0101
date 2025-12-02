// List available models
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);

        console.log('🔍 Fetching available models...\n');

        // Try to list models
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log('✅ Available models:');
            data.models.forEach(model => {
                console.log(`   - ${model.name}`);
                if (model.supportedGenerationMethods) {
                    console.log(`     Methods: ${model.supportedGenerationMethods.join(', ')}`);
                }
            });
        } else {
            console.log('❌ Error:', data);
        }
    } catch (error) {
        console.error('❌ Failed to list models:', error.message);
    }
}

listModels();
