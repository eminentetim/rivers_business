const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  course: { type: String, required: true },
  paymentFor: { type: String, required: true },
  amount: { type: Number, required: true },
  receiptUrl: { type: String },
  reference: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Payment', paymentSchema);
