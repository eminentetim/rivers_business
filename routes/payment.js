const express = require('express');
const router = express.Router();
const Payment = require('../models/payment');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Student uploads payment receipt
router.post('/payments', upload.single('receipt'), async (req, res) => {
    try {
        const { fullName, email, phoneNumber, courseStudy, paymentFor, amount } = req.body;
        const receipt = req.file.path;

        const newPayment = new StudentPayment({
            fullName,
            email,
            phoneNumber,
            courseStudy,
            paymentFor,
            amount,
            receipt
        });

        await newPayment.save();
        res.status(201).json({ message: 'Payment details submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting payment details', error });
    }
});
module.exports = router;

