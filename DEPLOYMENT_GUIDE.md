# 🚀 Vercel Deployment Guide for AI Code Reviewer

This guide will help you deploy both the backend and frontend of the AI Code Reviewer to Vercel.

## 📁 Project Structure
```
ai_project/
├── Backend/          # Express.js API
└── frontend/         # React + Vite frontend
```

## 🔧 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```
3. **Git Repository**: Push your code to GitHub/GitLab/Bitbucket

## 🌐 Deploy Backend (API)

### Step 1: Prepare Backend for Deployment
The backend is already configured with:
- ✅ `vercel.json` configuration
- ✅ Environment-aware server setup
- ✅ Proper export for serverless functions

### Step 2: Deploy Backend
```bash
cd Backend
vercel login
vercel --prod
```

### Step 3: Set Environment Variables
After deployment, set the Google Gemini API key:
```bash
vercel env add GOOGLE_GEMINI_KEY production
# Enter your API key when prompted: AIzaSyDcXSVqoThZpCTZA8j9BGNj5peZGpLKVCU
```

### Step 4: Note Backend URL
After deployment, you'll get a URL like: `https://your-backend-abc123.vercel.app`

## 🎨 Deploy Frontend

### Step 1: Update API URL
Update the frontend environment variable with your backend URL:

1. Edit `frontend/.env.production`:
   ```env
   VITE_API_BASE_URL=https://your-backend-abc123.vercel.app/api/ai
   ```

### Step 2: Deploy Frontend
```bash
cd frontend
vercel --prod
```

### Step 3: Set Environment Variables (in Vercel Dashboard)
1. Go to Vercel dashboard
2. Select your frontend project
3. Go to Settings > Environment Variables
4. Add:
   - `VITE_API_BASE_URL` = `https://your-backend-abc123.vercel.app/api/ai`

## 🔄 Alternative: Deploy via GitHub

### Option 1: Deploy Backend via GitHub
1. Create a new repository for backend
2. Push backend code to repository
3. Connect repository to Vercel
4. Set environment variables in Vercel dashboard

### Option 2: Deploy Frontend via GitHub
1. Create a new repository for frontend (or use same repo with different folder)
2. Push frontend code to repository
3. Connect repository to Vercel
4. Set build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🛠️ Quick Deployment Commands

### Deploy Backend:
```bash
cd /Users/adityaprakash/Documents/ai_project/Backend
vercel login
vercel --prod
vercel env add GOOGLE_GEMINI_KEY production
```

### Deploy Frontend:
```bash
cd /Users/adityaprakash/Documents/ai_project/frontend
# Update .env.production with backend URL first
vercel --prod
```

## 🔍 Verify Deployment

### Test Backend:
```bash
curl https://your-backend-url.vercel.app/api/ai/health
```

### Test Frontend:
Visit your frontend URL and test the code review functionality.

## 🎯 Post-Deployment Checklist

- [ ] Backend API responds to health check
- [ ] Frontend loads without errors
- [ ] Code review functionality works
- [ ] CORS is properly configured
- [ ] Environment variables are set
- [ ] Both deployments are connected

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure backend CORS is configured for frontend URL
2. **API Key Issues**: Verify environment variable is set correctly
3. **Build Errors**: Check Node.js version compatibility
4. **Function Timeout**: Vercel has 10-second timeout for Hobby plan

### Update CORS for Production:
Add your frontend URL to the CORS configuration in `Backend/src/app.js`:
```javascript
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'https://your-frontend-url.vercel.app'  // Add this
  ],
  credentials: true
};
```

## 📱 Domain Setup (Optional)

1. **Custom Domain**: Add custom domain in Vercel dashboard
2. **SSL**: Automatically provided by Vercel
3. **Environment URLs**: Different URLs for preview/production

## 🎉 Success!

Your AI Code Reviewer should now be live and accessible worldwide!

- **Backend API**: `https://your-backend-url.vercel.app`
- **Frontend App**: `https://your-frontend-url.vercel.app`
