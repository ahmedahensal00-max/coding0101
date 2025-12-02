// Test script to verify OPENAI_API_KEY
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    console.error('❌ OPENAI_API_KEY is not set in .env.local');
    process.exit(1);
}

if (apiKey.startsWith('sk-')) {
    console.log('✅ OPENAI_API_KEY is set and has correct format (starts with sk-)');
    console.log(`   Key length: ${apiKey.length} characters`);
    console.log(`   First 10 chars: ${apiKey.substring(0, 10)}...`);
} else {
    console.error('❌ OPENAI_API_KEY does not start with "sk-"');
    process.exit(1);
}

// Test actual API call
async function testAPI() {
    try {
        const OpenAI = require('openai').default;
        const client = new OpenAI({ apiKey });

        console.log('\n🔄 Testing API connection...');

        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "Say 'API key works!'" }],
            max_tokens: 10
        });

        console.log('✅ API call successful!');
        console.log(`   Response: ${response.choices[0].message.content}`);
    } catch (error) {
        console.error('❌ API call failed:', error.message);
        process.exit(1);
    }
}

testAPI();
