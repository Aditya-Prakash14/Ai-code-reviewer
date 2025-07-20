# AI Code Reviewer

A powerful AI-powered code review service built with Node.js and Google's Gemini AI. This service provides comprehensive code analysis, security reviews, performance optimization suggestions, and refactoring recommendations.

## Features

- **Comprehensive Code Review**: Get detailed feedback on code quality, best practices, and potential issues
- **Security Analysis**: Identify security vulnerabilities and get recommendations for fixes
- **Performance Optimization**: Receive suggestions for improving code performance
- **Maintainability Assessment**: Analyze code structure and maintainability
- **Complexity Analysis**: Get detailed metrics about your code's complexity
- **Refactoring Suggestions**: Receive specific recommendations for improving code structure

## Supported Languages

- JavaScript
- TypeScript
- Python
- Java
- C++
- C#
- Go
- Rust
- PHP
- Ruby
- Swift
- Kotlin

## API Endpoints

### POST `/api/ai/review`
Review code with AI analysis.

**Request Body:**
```json
{
  "code": "function example() { return 'Hello World'; }",
  "language": "javascript",
  "reviewType": "comprehensive"
}
```

**Review Types:**
- `comprehensive` - Complete analysis covering all aspects
- `security` - Focus on security vulnerabilities
- `performance` - Focus on performance optimization
- `maintainability` - Focus on code maintainability

**Response:**
```json
{
  "success": true,
  "data": {
    "review": {
      "overall_rating": "8",
      "summary": "Good code with minor improvements needed",
      "issues": [
        {
          "severity": "medium",
          "category": "style",
          "line": "1",
          "description": "Function could benefit from documentation",
          "suggestion": "Add JSDoc comments to describe function purpose"
        }
      ],
      "strengths": ["Clear function naming", "Simple logic"],
      "recommendations": ["Add documentation", "Consider error handling"]
    },
    "metadata": {
      "language": "javascript",
      "reviewType": "comprehensive",
      "timestamp": "2025-01-20T10:30:00Z",
      "codeLength": 45
    }
  }
}
```

### POST `/api/ai/analyze-complexity`
Analyze code complexity metrics.

**Request Body:**
```json
{
  "code": "your code here",
  "language": "javascript"
}
```

### POST `/api/ai/suggest-refactoring`
Get refactoring suggestions for your code.

**Request Body:**
```json
{
  "code": "your code here",
  "language": "javascript"
}
```

### GET `/api/ai/health`
Check if the AI service is healthy and responding.

### GET `/api/ai/capabilities`
Get information about supported languages, review types, and features.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env`:
   ```
   GOOGLE_GEMINI_KEY=your_google_ai_api_key
   ```

4. Start the server:
   ```bash
   npm run dev  # Development mode with nodemon
   npm start    # Production mode
   ```

## Getting Google AI API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` file

## Testing the API

Use the included test script to verify everything is working:

```bash
node test-api.js
```

Or test individual endpoints with curl:

```bash
# Test health check
curl http://localhost:3000/api/ai/health

# Test code review
curl -X POST http://localhost:3000/api/ai/review \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "function add(a, b) { return a + b; }",
    "language": "javascript",
    "reviewType": "comprehensive"
  }'
```

## Project Structure

```
Backend/
├── src/
│   ├── controllers/
│   │   └── ai.controller.js     # Request handlers
│   ├── services/
│   │   └── ai.service.js        # AI integration logic
│   ├── routes/
│   │   └── ai.routes.js         # API route definitions
│   └── app.js                   # Express app configuration
├── server.js                    # Server entry point
├── test-api.js                  # API testing script
├── package.json
└── .env                         # Environment variables
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request**: Missing or invalid request data
- **500 Internal Server Error**: AI service errors or server issues
- **503 Service Unavailable**: AI service is not responding

## Rate Limiting

Currently, there are no built-in rate limits, but you may want to add them for production use. Consider using packages like `express-rate-limit`.

## Security Considerations

1. **API Key Security**: Never commit your Google AI API key to version control
2. **Input Validation**: The service validates input but always sanitize data in production
3. **CORS**: Configure CORS appropriately for your frontend domain
4. **HTTPS**: Use HTTPS in production
5. **Rate Limiting**: Implement rate limiting to prevent abuse

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC

## Support

For issues and questions, please open an issue on the GitHub repository.
