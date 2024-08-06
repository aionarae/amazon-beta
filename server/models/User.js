const mongoose = require('mongoose');
  
const { Schema } = mongoose;

const UserSchema = new Schema({
  
    name: {
      type: String,
      required: true,
    },
     username: {
       type: String,
       required: true,
       unique: true
     },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    status: {
      type: String,
      default: 'active',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

const User = mongoose.model('User', UserSchema);

module.exports = User;

