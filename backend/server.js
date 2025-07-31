const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const mainRoutes = require('./routes/main.routes');
const surveyRoutes = require('./routes/survey.routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', mainRoutes);
app.use('/api', surveyRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT || 5000}`);
  });
});
