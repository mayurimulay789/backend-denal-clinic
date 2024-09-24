import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import { ConnectDB } from './config/db.js'; 
import ErrorMiddleware from './middlewares/Error.js'; // Ensure to add .js

// Load environment variables
dotenv.config({ path: './config/config.env' }); // Update the path to your .env file

// Initialize Express app
const app = express();

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
app.use(cookieParser());
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Define routes
import userRoutes from './routes/userRoutes.js'; // Ensure to add .js
import sliderRoutes from './routes/sliderRoutes.js'; // Ensure to add .js
import otherRoutes from './routes/ytshortRoutes.js'; // Ensure to add .js

// API Routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/slider', sliderRoutes);
app.use('/api/v1/other', otherRoutes);

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
