const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amazon-beta';

mongoose.connect(mongoUri);

module.exports = mongoose.connection;