const mongoose = require('mongoose');

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error('MONGO_URI is not defined in environment variables');
        console.log('Please set up your MongoDB connection string in .env file');
        return;
    }
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.log('Server will continue without database connection');
        console.log('To fix this:');
        console.log('1. Install MongoDB locally, OR');
        console.log('2. Use MongoDB Atlas (free cloud database)');
        console.log('3. Update MONGO_URI in your .env file');
    }
};

module.exports = connectDB;
