const Notification = require('../models/notification');

exports.createNotification = async (req, res) => {
  const { title, date, time, location, course, year } = req.body;

  try {
    const notification = new Notification({ title, date, time, location, course, year });
    await notification.save();
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getNotificationsForCourseAndYear = async (req, res) => {
  const { course, year } = req.query;

  try {
    const notifications = await Notification.find({ course, year });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

