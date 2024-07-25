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
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(`mongodb://localhost:27017/riverStateBusinessSchool`, { 
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
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/index'));
app.use('/admin', require('./routes/admin'));
app.use('/student', require('./routes/student'));
app.use('/application', require('./routes/application'));
app.use('/payment', require('./routes/payment'));
app.use('/notifications', require('./routes/notification'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
