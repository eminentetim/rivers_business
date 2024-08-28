const paymentService = require('../services/paymentservice');

// Controller for initializing the transaction
exports.initializeTransaction = async (req, res) => {
  try {
    const transaction = await paymentService.initializeTransaction(req.body);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for verifying the transaction
exports.verifyTransaction = async (req, res) => {
  try {
    const transaction = await paymentService.verifyTransaction(req.query);
    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for handling Paystack webhooks
exports.paymentWebhookHandler = async (req, res) => {
  try {
    const headers = req.headers || {};
    const result = await paymentService.handlePaystackWebhook(
      req.body,
      headers['x-paystack-signature']
    );

    if (!result) {
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    res.status(200).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for fetching transactions
exports.findTransactions = async (req, res) => {
  try {
    const transactions = await paymentService.findMany();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
