const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  category: {
    type: String,
    enum: ['Food', 'Transport', 'Shopping', 'Bills', 'Health', 'Other'],
    default: 'Other'
  },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Expense', expenseSchema);