const express = require('express');
const router = express.Router();
const studentPaymentController = require('../controllers/payment');

// Define the routes
router.post('/initialize', studentPaymentController.initializeTransaction);
router.get('/callback', studentPaymentController.verifyTransaction);
router.post('/webhook', studentPaymentController.paymentWebhookHandler);
router.get('/', studentPaymentController.findTransactions);

module.exports = router;
