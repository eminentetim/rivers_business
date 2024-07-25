const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification');

// Create a notification
router.post('/create', notificationController.createNotification);

// Fetch notifications for students based on course and year
router.get('/student', notificationController.getNotificationsForCourseAndYear);

module.exports = router;

