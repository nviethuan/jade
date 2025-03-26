import mongoose from 'mongoose';

const walletSchema = new mongoose.Schema(
  {
    exchange: {
      type: String,
      required: true,
      default: 'binance',
    },
    base: {
      type: Number,
      required: true,
      default: 0,
    },
    quote: {
      type: Number,
      required: true,
      default: 0,
    },
    symBase: {
      type: String,
      required: true,
      default: 'BTC',
    },
    symQuote: {
      type: String,
      required: true,
      default: 'USDT',
    },
    bought: {
      type: Number,
      required: true,
      default: 0,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    fee: {
      type: Number,
      required: true,
      default: 0.001,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model('Wallet', walletSchema);

export default Wallet;
