const express = require('express');
const router = express.Router();
const TranscriptRequest = require('../models/transcriptRequest');

// Create a new transcript request
router.post('/', async (req, res) => {
  try {
    const { fullName, registrationNumber, emailAddress, phoneNumber, courseOfStudy, admissionYear, graduationYear, receiverEmail, organisationName } = req.body;
    
    const newRequest = new TranscriptRequest({
      fullName,
      registrationNumber,
      emailAddress,
      phoneNumber,
      courseOfStudy,
      admissionYear,
      graduationYear,
      receiverEmail,
      organisationName
    });

    await newRequest.save();
    res.status(201).send('Transcript request created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;

