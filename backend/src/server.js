const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/expenseapp';

app.use(cors());
app.use(express.json());

// Health check endpoint (nginx ke liye bhi)
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'expense-backend' });
});

app.use('/api/expenses', require('./routes/expenses'));

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Backend running on port ' + PORT));
  })
  .catch(err => {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  });

module.exports = app;