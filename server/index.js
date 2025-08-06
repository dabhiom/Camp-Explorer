const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const campRoutes = require('./routes/campRoutes');
const authRoutes = require('./routes/auth');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: { 
            title: 'Camp Explorer API',
            version: '1.0.0',
            description: 'API Documentation for Camp Explorer App',
        },
        servers: [
            {
                url: process.env.NODE_ENV === 'production' 
                    ? process.env.BASE_URL || 'https://your-domain.com'
                    : 'http://localhost:5000',
            },
        ],
    },
    apis: ['./routes/*.js'], // we’ll create this folder for route definitions
};

// Load environment variables
dotenv.config();

// Connect to DB (non-blocking)
connectDB().catch(err => {
    console.log('Database connection failed, but server will continue');
});

const app = express();

// Security middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? process.env.ALLOWED_ORIGINS?.split(',') || ['https://your-domain.com']
        : true,
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Note: No static file serving needed since images are stored as buffers in database

// ✅ Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/camps', campRoutes);

// Swagger documentation
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Camp Explorer API is running...',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        timestamp: new Date().toISOString()
    });
});

// Health check for load balancers
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
