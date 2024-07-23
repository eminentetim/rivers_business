const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/initiate', payment.initiatePayment);
router.post('/verify', payment.verifyPayment);
router.get('/status/:transactionId', payment.getPaymentStatus);

module.exports = router;
