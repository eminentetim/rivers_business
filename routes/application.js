const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application');

// Create a new application
router.post('/applications', applicationController.createApplication);

// Get all applications
router.get('/applications', applicationController.getAllApplications);

// Get a single application by ID
router.get('/applications/:id', applicationController.getApplicationById);

// Update an application
router.patch('/applications/:id', applicationController.updateApplication);

// remove an application
router.delete('/applications/:id', applicationController.deleteApplication);

module.exports = router;
