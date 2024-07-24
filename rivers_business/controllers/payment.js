const payment = require('../models/payment');
const axios = require('axios');
const { PAYSTACK_SECRET_KEY } = process.env;

exports.initiatePayment = async (req, res) => {
  try {
    const { studentId, amount } = req.body;
    const transactionId = generateUniqueTransactionId();

    const payment = new payment({
      studentId,
      amount,
      transactionId,
    });

    await payment.save();

    const response = await axios.post('https://api.paystack.co/transaction/initialize', {
      email: req.body.email,  // Make sure the email is passed in the request body
      amount: amount * 100, // Paystack expects amount in kobo
      reference: transactionId,
    }, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error initiating payment', error });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    });

    const payment = await payment.findOne({ transactionId: reference });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (response.data.data.status === 'success') {
      payment.status = 'completed';
    } else {
      payment.status = 'failed';
    }

    payment.updatedAt = Date.now();
    await payment.save();

    res.json({ message: 'Payment status updated', status: payment.status });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error });
  }
};

exports.getPaymentStatus = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await payment.findOne({ transactionId });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.json({ status: payment.status });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment status', error });
  }
};

function generateUniqueTransactionId() {
  return 'tx_' + Math.random().toString(36).substr(2, 9);
}
