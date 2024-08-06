const mongoose = require('mongoose');

const { Schema } = mongoose;

const CartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;