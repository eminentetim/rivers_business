const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  bankName: { type: String, required: true },
  acountNumber: { type: Number, required: true },
  receiptUrl: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Verified', 'Rejected'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', paymentSchema);

