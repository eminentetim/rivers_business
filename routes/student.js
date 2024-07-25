// routes/student.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Student dashboard route
router.get('/dashboard', auth, (req, res) => {
  if (req.user.role !== 'student') return res.status(403).send('Access denied');
  res.render('student/dashboard', { title: 'Student Dashboard' });
});

module.exports = router;
