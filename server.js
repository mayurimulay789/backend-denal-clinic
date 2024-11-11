import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js';
import ErrorMiddleware from './middlewares/Error.js';
import path from 'path';
// Load environment variables
dotenv.config({ path: './config/config.env' });

// Initialize Express app
const app = express();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')));

// Database Connection
ConnectDB();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

app.use(cookieParser());
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Define routes
import userRoutes from './routes/userRoutes.js';
import sliderRoutes from './routes/sliderRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import postRoutes from './routes/postRoutes.js'; // Ensure to add .js

// API Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/sliders', sliderRoutes);
app.use('/api/v1/appointments', appointmentRoutes);
app.use('/api/v1/posts', postRoutes); // Updated for versioning

// Test route
app.get('/', (req, res) => {
  res.send('Server is working...');
});

// Error Handling Middleware
app.use(ErrorMiddleware);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Export cloudinary for use in other modules
export { cloudinary };
