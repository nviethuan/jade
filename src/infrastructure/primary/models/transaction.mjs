import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
  },
  orderId: {
    type: Number,
    required: true,
  },
  orderListId: {
    type: Number,
    required: true,
  },
  clientOrderId: {
    type: String,
    required: true,
  },
  transactTime: {
    type: Number,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  origQty: {
    type: String,
    required: true,
  },
  executedQty: {
    type: String,
    required: true,
  },
  origQuoteOrderQty: {
    type: String,
    required: true,
  },
  cummulativeQuoteQty: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  timeInForce: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  side: {
    type: String,
    required: true,
  },
  workingTime: {
    type: Number,
    required: true,
  },
  fills: [
    {
      price: {
        type: String,
        required: true,
      },
      qty: {
        type: String,
        required: true,
      },
      commission: {
        type: String,
        required: true,
      },
      commissionAsset: {
        type: String,
        required: true,
      },
      tradeId: {
        type: Number,
        required: true,
      },
    },
  ],
  selfTradePreventionMode: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
  expires: 30 * 24 * 60 * 60, // 30 days in seconds
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
