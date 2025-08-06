# Camp Explorer API - Deployment Guide

## 🚀 Deployment-Ready Features

✅ **Buffer-based image storage** - No file system dependencies  
✅ **Environment-based configuration** - Easy cloud deployment  
✅ **Health check endpoints** - Load balancer ready  
✅ **CORS configuration** - Frontend integration ready  
✅ **Error handling** - Production-ready error management  
✅ **Security middleware** - Basic security measures  

## 📋 Prerequisites

- Node.js 14+ 
- MongoDB Atlas account (free tier available)
- Git repository
- Deployment platform account (Heroku, Vercel, Railway, etc.)

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://www.mongodb.com/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Choose "FREE" tier (M0)
   - Select cloud provider & region
   - Click "Create"

3. **Database Access**
   - Go to "Database Access"
   - Add new database user
   - Create username/password
   - Choose "Read and write to any database"

4. **Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string

## 🌐 Deployment Platforms

### Option 1: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create your-camp-explorer-api
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET=your_secure_jwt_secret
   heroku config:set BASE_URL=https://your-app-name.herokuapp.com
   ```

5. **Deploy**
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 2: Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables** in Vercel dashboard:
   - `NODE_ENV=production`
   - `MONGO_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_secure_jwt_secret`
   - `BASE_URL=https://your-app.vercel.app`

### Option 3: Railway

1. **Connect GitHub Repository**
   - Go to [railway.app](https://railway.app)
   - Connect your GitHub account
   - Select your repository

2. **Set Environment Variables**
   - `NODE_ENV=production`
   - `MONGO_URI=your_mongodb_atlas_connection_string`
   - `JWT_SECRET=your_secure_jwt_secret`

3. **Deploy**
   - Railway will automatically deploy on push

## 🔧 Environment Variables

### Production Environment
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/camp-explorer
JWT_SECRET=your-super-secure-jwt-secret-key
PORT=5000
BASE_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

### Development Environment
```env
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/camp-explorer
JWT_SECRET=your-dev-jwt-secret
PORT=5000
```

## 📊 API Endpoints

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://your-domain.com`

### Available Endpoints
- `GET /` - Health check
- `GET /health` - Load balancer health check
- `GET /api-docs` - Swagger documentation
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/camps` - Get all camps
- `GET /api/camps/:id` - Get camp by ID
- `POST /api/camps` - Create camp (with image)
- `PUT /api/camps/:id` - Update camp (with image)
- `DELETE /api/camps/:id` - Delete camp
- `GET /api/camps/:id/image` - Get camp image

## 🔒 Security Considerations

1. **JWT Secret**: Use a strong, random secret key
2. **CORS**: Configure allowed origins for production
3. **MongoDB**: Use connection string with username/password
4. **Environment Variables**: Never commit secrets to Git
5. **File Upload**: 5MB limit with type validation

## 🧪 Testing Deployment

1. **Health Check**
   ```bash
   curl https://your-domain.com/health
   ```

2. **API Documentation**
   - Visit: `https://your-domain.com/api-docs`

3. **Test Endpoints**
   ```bash
   # Create user
   curl -X POST https://your-domain.com/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"test","password":"password123"}'
   
   # Get camps
   curl https://your-domain.com/api/camps
   ```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string format
   - Verify network access settings
   - Ensure database user has correct permissions

2. **Port Issues**
   - Most platforms use `process.env.PORT`
   - Don't hardcode port numbers

3. **File Upload Issues**
   - Images are now stored as buffers
   - No file system dependencies
   - Check file size limits (5MB)

4. **CORS Errors**
   - Configure `ALLOWED_ORIGINS` for production
   - Include your frontend domain

### Logs
- **Heroku**: `heroku logs --tail`
- **Vercel**: Check dashboard logs
- **Railway**: Check deployment logs

## 📈 Monitoring

### Health Check Endpoints
- `GET /health` - Basic health status
- `GET /` - Detailed API status

### Recommended Monitoring
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor MongoDB Atlas metrics
- Set up error tracking (Sentry)

## 🔄 CI/CD Setup

### GitHub Actions Example
```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npm test
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: ${{ secrets.HEROKU_APP_NAME }}
          heroku_email: ${{ secrets.HEROKU_EMAIL }}
```

## 🎉 Success!

Your Camp Explorer API is now deployment-ready with:
- ✅ Buffer-based image storage
- ✅ MongoDB Atlas integration
- ✅ Production environment configuration
- ✅ Security best practices
- ✅ Health monitoring endpoints
- ✅ Comprehensive error handling

The API will work seamlessly across all cloud platforms! 