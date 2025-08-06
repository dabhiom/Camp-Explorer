# Camp Explorer API

A RESTful API for managing camping locations with image upload functionality.

## Features

- ✅ User authentication (signup/login) with JWT
- ✅ CRUD operations for camps
- ✅ Image upload functionality
- ✅ Swagger API documentation
- ✅ MongoDB integration
- ✅ File upload support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/camp-explorer
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

Once the server is running, visit `http://localhost:5000/api-docs` to access the Swagger documentation.

## Available Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user

### Camps
- `GET /api/camps` - Get all camps
- `GET /api/camps/:id` - Get camp by ID
- `POST /api/camps` - Create a new camp (with image upload)
- `PUT /api/camps/:id` - Update camp (with image upload)
- `DELETE /api/camps/:id` - Delete camp
- `GET /api/camps/:id/image` - Get camp image

### Image Upload

The API supports image uploads for camps. Images are stored as buffers in the database for better deployment compatibility.

**Features:**
- Images stored as binary data in MongoDB
- No file system dependencies
- Works on all cloud platforms
- Automatic file type validation
- 5MB file size limit

**Supported formats:** JPG, JPEG, PNG

**How to use images:**
1. Upload image with camp creation/update
2. Get image URL: `GET /api/camps/:id/image`
3. Frontend can display: `<img src="/api/camps/:id/image" />`

## Testing with Swagger

1. Start the server: `npm run dev`
2. Open `http://localhost:5000/api-docs`
3. You can test all endpoints directly from the Swagger UI
4. For image uploads, use the file upload feature in Swagger

## Project Structure

```
server/
├── config/
│   └── db.js          # Database configuration
├── controllers/
│   └── campController.js  # Camp business logic
├── middlewares/
│   └── upload.js      # File upload middleware
├── models/
│   ├── Camp.js        # Camp model
│   └── User.js        # User model
├── routes/
│   ├── auth.js        # Authentication routes
│   └── campRoutes.js  # Camp routes
├── uploads/           # (No longer used - images stored in database)
├── index.js           # Main server file
└── package.json
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/camp-explorer` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | `5000` |

## Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT authentication
- `multer` - File upload handling
- `cors` - Cross-origin resource sharing
- `dotenv` - Environment variables
- `swagger-jsdoc` - API documentation
- `swagger-ui-express` - Swagger UI

### Development
- `nodemon` - Development server with auto-restart 