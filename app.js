const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const Schema = mongoose.Schema;


const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const studentRoutes = require('./routes/student');
const applicationRoutes = require('./routes/application');
const paymentRoutes = require('./routes/payment');
const notificationRoutes = require('./routes/notification');
const transcriptRequestRoutes = require('./routes/transcriptRequest');

const app = express();
const cors = require('cors');
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection

mongoose.connect(`mongodb://localhost:27017/riverStateBusinessSchool `, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Session configuration
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/riverStateBusinessSchool' })
}));

// mongodb schema


// View engine
app.set('view engine', 'ejs');

// Routes
// Using routes
app.use('/api/auth', authRoutes);
app.use('/api', indexRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/application', applicationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/transcript-request', transcriptRequestRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));