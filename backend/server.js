const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Already imported
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mainRoutes = require('./routes/main.routes');
const surveyRoutes = require('./routes/survey.routes');

dotenv.config(); // Load environment variables from .env file

const app = express();

// --- START CORS CONFIGURATION ---
// Define the allowed origins for CORS.
// In development, you'll typically allow your local frontend.
// In production, you MUST replace 'http://localhost:3000' with your deployed Netlify frontend URL.
const allowedOrigins = [
  'http://localhost:3000', // Your local React frontend development server
  'http://localhost:5173', // Common for Vite/other React dev servers
  // Add your deployed Netlify frontend URL here when it's live.
  // Example: 'https://your-libraryapp-name.netlify.app'
  // You can get this URL from your Netlify dashboard after deployment.
  process.env.FRONTEND_URL // Use an environment variable for the deployed frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    // or if the origin is in our allowedOrigins list.
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify allowed HTTP methods
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 204 // For preflight requests
};

app.use(cors(corsOptions)); // Apply the configured CORS middleware
// --- END CORS CONFIGURATION ---

app.use(express.json()); // Middleware to parse JSON request bodies

// Mount your route handlers
app.use('/api', mainRoutes);
app.use('/api', surveyRoutes);

// Simple root route to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Connect to MongoDB and start the server
connectDB().then(() => {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`CORS enabled for origins: ${allowedOrigins.join(', ')}`);
  });
}).catch(err => {
  console.error("Failed to connect to the database:", err.message);
  process.exit(1); // Exit process with failure
});
