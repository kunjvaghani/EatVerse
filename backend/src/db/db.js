// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

// function connextDB(){
//     mongoose.connect(process.env.MONGO_URI)
//     .then(()=>{
//         console.log("Connected to MongoDB");
//     }).catch((err)=> {
//         console.log("Error while connecting to MongoDB", err);
//     })
// }

// module.exports = connextDB;

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not set. Add MONGO_URI to your backend environment variables.');
  }

  try {
    // Use detailed connection options for serverless environments (like Vercel)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // stop trying after 10s instead of hanging
      socketTimeoutMS: 45000, // close sockets after 45s idle
    });

    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    // Important: exit the process if connection fails (so Vercel logs show it)
    process.exit(1);
  }
};

module.exports = connectDB;
