// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Admin dashboard route
router.get('/dashboard', (req, res) => {
  res.render('admin/dashboard', { title: 'Admin Dashboard' });
});

// Admin user management routes (example)
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.render('admin/users', { users });
});

module.exports = router;

