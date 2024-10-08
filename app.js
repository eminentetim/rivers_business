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
const studentPaymentRoutes = require('./routes/payment');
const notificationRoutes = require('./routes/notification');
const transcriptRequestRoutes = require('./routes/transcriptRequest');

const app = express();

const cors = require('cors');

app.use(cors({
  // origin: 'https://portal.rsubs.org',
  // methods: ['GET', 'POST', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization']
}));

//  app.use((req, res, next) => {
//   // Set CORS headers
//   res.header('Access-Control-Allow-Origin', 'https://portal.rsubs.org');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');

//   // Handle preflight requests
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(204); // No Content
//   }

//   // Continue to the next middleware or route handler
//   next();
// });



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// MongoDB connection

const MONGODB_URI = "mongodb+srv://rsubs-backend:LKZz2r7RwbbPIuOO@stackupnodeii.lcuqocn.mongodb.net/?retryWrites=true&w=majority&appName=StackUpNodeII/";
mongoose.connect(MONGODB_URI, { 
  dbName:"riverStateBusinessSchool",
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => console.log(`Connected to MongoDB :: ${MONGODB_URI}`))
.catch((err) =>
  console.log(`Error connecting to MongoDB :: ${MONGODB_URI}`)
);

// Session configuration
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: MONGODB_URI })
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
app.use('/api/student-payment', studentPaymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/transcript-request', transcriptRequestRoutes);
const PORT = process.env.PORT || 50001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
