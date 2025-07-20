const aiService = require('../services/ai.service');

class AIController {
    // Review code endpoint
    async reviewCode(req, res) {
        try {
            const { code, language = 'javascript', reviewType = 'comprehensive' } = req.body;

            if (!code) {
                return res.status(400).json({
                    success: false,
                    message: 'Code is required for review'
                });
            }

            const review = await aiService.reviewCode(code, language, reviewType);

            res.json({
                success: true,
                data: {
                    review,
                    metadata: {
                        language,
                        reviewType,
                        timestamp: new Date().toISOString(),
                        codeLength: code.length
                    }
                }
            });
        } catch (error) {
            console.error('Error in reviewCode controller:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to review code',
                error: error.message
            });
        }
    }

    // Analyze code complexity
    async analyzeComplexity(req, res) {
        try {
            const { code, language = 'javascript' } = req.body;

            if (!code) {
                return res.status(400).json({
                    success: false,
                    message: 'Code is required for complexity analysis'
                });
            }

            const complexity = await aiService.analyzeCodeComplexity(code, language);

            res.json({
                success: true,
                data: {
                    complexity,
                    metadata: {
                        language,
                        timestamp: new Date().toISOString(),
                        codeLength: code.length
                    }
                }
            });
        } catch (error) {
            console.error('Error in analyzeComplexity controller:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to analyze code complexity',
                error: error.message
            });
        }
    }

    // Suggest refactoring
    async suggestRefactoring(req, res) {
        try {
            const { code, language = 'javascript' } = req.body;

            if (!code) {
                return res.status(400).json({
                    success: false,
                    message: 'Code is required for refactoring suggestions'
                });
            }

            const suggestions = await aiService.suggestRefactoring(code, language);

            res.json({
                success: true,
                data: {
                    suggestions,
                    metadata: {
                        language,
                        timestamp: new Date().toISOString(),
                        codeLength: code.length
                    }
                }
            });
        } catch (error) {
            console.error('Error in suggestRefactoring controller:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to suggest refactoring',
                error: error.message
            });
        }
    }

    // Health check for AI service
    async healthCheck(req, res) {
        try {
            // Test with a simple code snippet
            const testCode = 'console.log("Hello, World!");';
            await aiService.reviewCode(testCode, 'javascript', 'comprehensive');

            res.json({
                success: true,
                message: 'AI Code Reviewer service is healthy',
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Health check failed:', error);
            res.status(503).json({
                success: false,
                message: 'AI service is not available',
                error: error.message
            });
        }
    }

    // Get supported languages and review types
    async getCapabilities(req, res) {
        res.json({
            success: true,
            data: {
                supportedLanguages: [
                    'javascript',
                    'typescript',
                    'python',
                    'java',
                    'cpp',
                    'csharp',
                    'go',
                    'rust',
                    'php',
                    'ruby',
                    'swift',
                    'kotlin'
                ],
                reviewTypes: [
                    {
                        type: 'comprehensive',
                        description: 'Complete code review covering all aspects'
                    },
                    {
                        type: 'security',
                        description: 'Focus on security vulnerabilities and best practices'
                    },
                    {
                        type: 'performance',
                        description: 'Focus on performance optimization opportunities'
                    },
                    {
                        type: 'maintainability',
                        description: 'Focus on code maintainability and readability'
                    }
                ],
                features: [
                    'Code review with detailed feedback',
                    'Complexity analysis',
                    'Refactoring suggestions',
                    'Security vulnerability detection',
                    'Performance optimization recommendations'
                ]
            }
        });
    }
}

module.exports = new AIController();
