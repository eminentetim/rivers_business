const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');
const upload = require('../upload'); // Import the Multer configuration

// Existing routes
router.post('/', applicationController.createApplication);
router.get('/', applicationController.getAllApplications);
router.get('/:id', applicationController.getApplicationById);
router.patch('/:id', applicationController.updateApplication);
router.delete('/:id', applicationController.deleteApplication);

// Route for uploading files and updating the application
router.post('/upload', upload.fields([
  { name: 'degreeCertificate', maxCount: 1 },
  { name: 'curriculumVitae', maxCount: 1 },
  { name: 'evidenceOfAbilityToPay', maxCount: 1 },
  { name: 'oLevelResult', maxCount: 2 },
  { name: 'photo', maxCount: 1 },
  { name: 'nyscExemptionLetter', maxCount: 1 }
]), applicationController.uploadAttachments);

module.exports = router;

