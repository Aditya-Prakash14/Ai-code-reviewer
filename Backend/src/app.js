const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aiRoutes = require('./routes/ai.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow larger payloads for code files
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'AI Code Reviewer API',
        version: '1.0.0',
        endpoints: {
            'POST /api/ai/review': 'Review code with AI',
            'POST /api/ai/analyze-complexity': 'Analyze code complexity',
            'POST /api/ai/suggest-refactoring': 'Get refactoring suggestions',
            'GET /api/ai/health': 'Check AI service health',
            'GET /api/ai/capabilities': 'Get AI service capabilities'
        }
    });
});

// API routes
app.use('/api/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

module.exports = app;