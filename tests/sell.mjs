import { Spot } from '@binance/connector';

const API_KEY = 'yzjjXMHhjsGnxbOEzve6fz61vvw0HOinfhV2rXAAOdn72JhscfUIlkCFvgjv8xGt';
const API_SECRET = 'UJo7NOmMqjXvmF0ochoPvaHhkzXXuLJ5k6kVHxl9TWfQWMj7FSx40aPp9e373LmG';
const BASE_URL = 'https://testnet.binance.vision';

const spot = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });

const sell = async () => {
  const response = await spot.newOrder('BTCUSDT', 'SELL', 'MARKET', {
    quantity: 0.0001,
  });

  console.log('response', response);
  console.log('json response', JSON.stringify(response.data, null, 2));
  console.log('response.data', response.data);
};

/** Response
{
  "symbol": "BTCUSDT",
  "orderId": 707963,
  "orderListId": -1,
  "clientOrderId": "macvjVLxNNCOFQvDcUs7wk",
  "transactTime": 1743844184776,
  "price": "0.00000000",
  "origQty": "0.00100000",
  "executedQty": "0.00100000",
  "origQuoteOrderQty": "0.00000000",
  "cummulativeQuoteQty": "83.60451000",
  "status": "FILLED",
  "timeInForce": "GTC",
  "type": "MARKET",
  "side": "SELL",
  "workingTime": 1743844184776,
  "fills": [
    {
      "price": "83604.51000000",
      "qty": "0.00100000",
      "commission": "0.00000000",
      "commissionAsset": "USDT",
      "tradeId": 221753
    }
  ],
  "selfTradePreventionMode": "EXPIRE_MAKER"
}
 */
await sell();
