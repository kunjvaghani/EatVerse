const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');


const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
// }));

const allowedOrigins = [
  'http://localhost:5173',                   // Local dev frontend
  'https://zomato-clone-87w6.vercel.app'    // Deployed frontend URL (remove trailing slash!)
];

// Use function form of origin to properly allow multiple domains
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true   // Allow cookies to be sent
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Welcome to Zomato API");
});

app.use('/api', authRoutes);
app.use('/api/food' , foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('API error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
});

module.exports = app;