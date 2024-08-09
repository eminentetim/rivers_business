const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Student uploads payment receipt
router.post('/upload', upload.single('receipt'), async (req, res) => {
  const { studentId, amount, bankName } = req.body;
  const receiptUrl = req.file.path; // Assume the receipt is stored at this path

  try {
    const payment = new Payment({ studentId, amount, bankName, receiptUrl });
    await payment.save();
    res.status(201).send('Receipt uploaded successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Admin verifies payment
router.post('/verify/:paymentId', async (req, res) => {
  const { paymentId } = req.params;
  const { status } = req.body;

  try {
    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).send('Payment not found');
    }

    payment.status = status;
    await payment.save();
    res.status(200).send('Payment status updated');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;

