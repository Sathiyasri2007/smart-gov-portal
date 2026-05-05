const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({
  origin: '*',
  credentials: false
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/uploads', express.static('uploads'));

app.use('/api/auth',          require('./routes/authRoutes'));
app.use('/api/schemes',       require('./routes/schemeRoutes'));
app.use('/api/schemes',       require('./routes/eligibilityRoutes'));
app.use('/api/applications',  require('./routes/applicationRoutes'));
app.use('/api/bookmarks',     require('./routes/bookmarkRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin',         require('./routes/adminRoutes'));

app.get('/', (req, res) => {
  res.send('Smart Government Scheme Portal API');
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
