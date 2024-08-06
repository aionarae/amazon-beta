const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const OrderItem = mongoose.model('OrderItem', OrderItemSchema);

module.exports = OrderItem;