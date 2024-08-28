const axios = require('axios');
const Transaction = require('../models/payment');

const PAYSTACK_SECRET_KEY = 'sk_test_46510994026e659b84971642064de053d30cf8c0';
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

// Initialize transaction
exports.initializeTransaction = async (dto) => {
  const response = await axios.post(
    `${PAYSTACK_BASE_URL}/transaction/initialize`,
    {
      email: dto.email,
      amount: dto.amount * 100, // Paystack expects the amount in kobo
      metadata: {
        studentName: dto.studentName,
        phoneNumber: dto.phoneNumber,
        course: dto.course,
        paymentFor: dto.paymentFor,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const transaction = new Transaction({
    studentName: dto.studentName,
    email: dto.email,
    phoneNumber: dto.phoneNumber,
    course: dto.course,
    paymentFor: dto.paymentFor,
    amount: dto.amount,
    reference: response.data.data.reference,
    status: 'pending',
  });

  await transaction.save();
  return response.data.data;
};

// Verify transaction
exports.verifyTransaction = async (query) => {
  const { reference } = query;
  const response = await axios.get(
    `${PAYSTACK_BASE_URL}/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const transaction = await Transaction.findOne({ reference });
  if (response.data.data.status === 'success') {
    transaction.status = 'success';
  } else {
    transaction.status = 'failed';
  }

  await transaction.save();
  return transaction;
};

// Handle Paystack webhook
exports.handlePaystackWebhook = async (dto, signature) => {
  const { reference, event } = dto.data;
  const transaction = await Transaction.findOne({ reference });

  if (event === 'charge.success') {
    transaction.status = 'success';
  } else {
    transaction.status = 'failed';
  }

  await transaction.save();
  return true;
};

// Find transactions
exports.findMany = async () => {
  return await Transaction.find();
};
