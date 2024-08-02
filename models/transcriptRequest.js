const mongoose = require('mongoose');

const transcriptRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  courseOfStudy: { type: String, required: true },
  admissionYear: { type: Number, required: true },
  graduationYear: { type: Number, required: true },
  receiverEmail: { type: String, required: true },
  organisationName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TranscriptRequest', transcriptRequestSchema);

