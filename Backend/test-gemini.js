const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGeminiAPI() {
    try {
        console.log('Testing Google Gemini API...');
        console.log('API Key:', process.env.GOOGLE_GEMINI_KEY ? 'Present' : 'Missing');
        
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = "Hello, can you respond with 'API test successful'?";
        console.log('Sending test prompt...');
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('✅ Success! Response:', text);
        return true;
    } catch (error) {
        console.error('❌ Error:', error.message);
        console.error('Full error:', error);
        return false;
    }
}

testGeminiAPI().then((success) => {
    process.exit(success ? 0 : 1);
});
