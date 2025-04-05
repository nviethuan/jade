import { Spot } from '@binance/connector';
import binanceConfig from '../configs/binance.config.mjs';

const client = new Spot(...binanceConfig.testnet);

const getOrder = async () => {
  const response = await client.getOrder('BTCUSDT', {
    orderId: 486346,
  });
  console.log('response', response.data);
};

/**
response: {
  symbol: 'BTCUSDT',
  orderId: 486346,
  orderListId: -1,
  clientOrderId: 'WzPVvTUZnTDRlljfItYCqq',
  price: '0.00000000',
  origQty: '0.00100000',
  executedQty: '0.00100000',
  cummulativeQuoteQty: '83.11434000',
  status: 'FILLED',
  timeInForce: 'GTC',
  type: 'MARKET',
  side: 'BUY',
  stopPrice: '0.00000000',
  icebergQty: '0.00000000',
  time: 1743781874065,
  updateTime: 1743781874065,
  isWorking: true,
  workingTime: 1743781874065,
  origQuoteOrderQty: '0.00000000',
  selfTradePreventionMode: 'EXPIRE_MAKER'
}
 */
await getOrder();
