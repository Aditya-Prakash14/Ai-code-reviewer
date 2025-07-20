const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

class AIService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async reviewCode(code, language = 'javascript', reviewType = 'comprehensive') {
        try {
            const prompt = this.generateReviewPrompt(code, language, reviewType);
            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return this.parseReviewResponse(response.text());
        } catch (error) {
            console.error('Error reviewing code:', error);
            throw new Error('Failed to review code');
        }
    }

    generateReviewPrompt(code, language, reviewType) {
        const basePrompt = `You are an expert code reviewer. Please review the following ${language} code and provide detailed feedback.`;
        
        const reviewTypes = {
            'comprehensive': `
                Please analyze the code for:
                1. Code quality and best practices
                2. Performance optimization opportunities
                3. Security vulnerabilities
                4. Maintainability and readability
                5. Potential bugs or edge cases
                6. Adherence to coding standards
                7. Documentation and comments
                8. Architecture and design patterns
            `,
            'security': `
                Focus specifically on security aspects:
                1. Input validation and sanitization
                2. Authentication and authorization issues
                3. Data exposure risks
                4. Injection vulnerabilities
                5. Cryptographic issues
                6. Access control problems
            `,
            'performance': `
                Focus on performance optimization:
                1. Time complexity analysis
                2. Memory usage optimization
                3. Database query optimization
                4. Caching opportunities
                5. Algorithm efficiency
                6. Resource utilization
            `,
            'maintainability': `
                Focus on code maintainability:
                1. Code organization and structure
                2. Naming conventions
                3. Function and class design
                4. Documentation quality
                5. Code reusability
                6. Testing considerations
            `
        };

        return `${basePrompt}

${reviewTypes[reviewType] || reviewTypes['comprehensive']}

Please provide your response in the following JSON format:
{
    "overall_rating": "rating from 1-10",
    "summary": "brief overall assessment",
    "issues": [
        {
            "severity": "high|medium|low",
            "category": "security|performance|maintainability|style|bug",
            "line": "line number if applicable",
            "description": "detailed description of the issue",
            "suggestion": "how to fix or improve"
        }
    ],
    "strengths": ["list of positive aspects"],
    "recommendations": ["general recommendations for improvement"]
}

Code to review:
\`\`\`${language}
${code}
\`\`\``;
    }

    parseReviewResponse(responseText) {
        try {
            // Extract JSON from the response (in case there's extra text)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                return {
                    success: true,
                    overall_rating: parsed.overall_rating || "N/A",
                    summary: parsed.summary || "Review completed",
                    issues: parsed.issues || [],
                    strengths: parsed.strengths || [],
                    recommendations: parsed.recommendations || [],
                    rawResponse: responseText
                };
            }
            
            // If no JSON found, return a formatted response
            return {
                success: true,
                overall_rating: "N/A",
                summary: responseText,
                issues: [],
                strengths: [],
                recommendations: [],
                rawResponse: responseText
            };
        } catch (error) {
            console.error('Error parsing AI response:', error);
            return {
                success: false,
                overall_rating: "N/A",
                summary: "Error parsing AI response",
                issues: [],
                strengths: [],
                recommendations: [],
                rawResponse: responseText,
                error: error.message
            };
        }
    }

    async analyzeCodeComplexity(code, language = 'javascript') {
        try {
            const prompt = `Analyze the complexity of this ${language} code:

${code}

Provide analysis for:
1. Cyclomatic complexity
2. Lines of code
3. Number of functions/methods
4. Depth of nesting
5. Overall complexity rating (1-10)

Respond in JSON format with these metrics.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error analyzing code complexity:', error);
            throw new Error('Failed to analyze code complexity');
        }
    }

    async suggestRefactoring(code, language = 'javascript') {
        try {
            const prompt = `Suggest refactoring improvements for this ${language} code:

${code}

Please provide:
1. Specific refactoring suggestions
2. Improved code examples
3. Explanation of benefits
4. Step-by-step refactoring plan

Focus on improving readability, maintainability, and performance.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error suggesting refactoring:', error);
            throw new Error('Failed to suggest refactoring');
        }
    }
}

module.exports = new AIService();