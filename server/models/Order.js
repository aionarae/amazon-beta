const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;