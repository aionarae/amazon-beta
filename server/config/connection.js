const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amazon-beta');
console.log('Connecting to MongoDB with URI:', mongoUri);

module.exports = mongoose.connection;