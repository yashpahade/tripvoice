require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const compression = require('compression');

const { connectDB } = require('./config/db');
const routes = require('./routes/index');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

// Apply middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
  app.use(morgan('dev'));
}
app.use(compression());

// Mount routes (both /api and / to handle direct and rewritten requests)
app.use('/api', routes);
app.use('/', routes);

// Health check endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    success: true,
    message: 'TripNest API is running',
    timestamp: new Date().toISOString()
  });
});

// Apply global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
let server;

if (!process.env.VERCEL) {
  server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.error(`Error: ${err.message}`);
    if (server) server.close(() => process.exit(1));
  });

  process.on('uncaughtException', (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    if (server) server.close(() => process.exit(1));
  });
}

module.exports = app;
