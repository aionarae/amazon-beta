const mongoose = require('mongoose');

const { Schema } = mongoose;

const ReviewSchema = new Schema({
  
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  });

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;