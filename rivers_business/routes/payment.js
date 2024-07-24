const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');

router.post('/initiate', paymentController.initiatePayment);
router.post('/verify/:reference', paymentController.verifyPayment);
router.get('/status/:transactionId', paymentController.getPaymentStatus);

module.exports = router;