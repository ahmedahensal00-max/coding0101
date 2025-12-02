// Test script to verify GEMINI_API_KEY
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('❌ GEMINI_API_KEY is not set in .env.local');
    process.exit(1);
}

if (apiKey.startsWith('AIza')) {
    console.log('✅ GEMINI_API_KEY is set and has correct format (starts with AIza)');
    console.log(`   Key length: ${apiKey.length} characters`);
    console.log(`   First 10 chars: ${apiKey.substring(0, 10)}...`);
} else {
    console.error('❌ GEMINI_API_KEY does not start with "AIza"');
    process.exit(1);
}

// Test actual API call
async function testAPI() {
    try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        console.log('\n🔄 Testing API connection...');

        const result = await model.generateContent('Say "API key works!"');
        const response = await result.response;
        const text = response.text();

        console.log('✅ API call successful!');
        console.log(`   Response: ${text}`);
    } catch (error) {
        console.error('❌ API call failed:', error.message);
        process.exit(1);
    }
}

testAPI();
