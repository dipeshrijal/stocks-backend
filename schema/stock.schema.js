const mongoose = require("mongoose");
const { Schema } = mongoose;

const stockSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  commission: {
    type: Number,
  },
  amount: {
    type: Number,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Stock", stockSchema);
