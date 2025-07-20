require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;