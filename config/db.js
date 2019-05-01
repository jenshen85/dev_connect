const mongoose = require('mongoose');
const db = require('./keys').mongoURI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit procces rith failure
    process.exit(1);
  }
};

module.exports = connectDB;
