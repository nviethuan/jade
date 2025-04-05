import { Spot } from '@binance/connector';

const API_KEY = 'yzjjXMHhjsGnxbOEzve6fz61vvw0HOinfhV2rXAAOdn72JhscfUIlkCFvgjv8xGt';
const API_SECRET = 'UJo7NOmMqjXvmF0ochoPvaHhkzXXuLJ5k6kVHxl9TWfQWMj7FSx40aPp9e373LmG';
const BASE_URL = 'https://testnet.binance.vision';

const spot = new Spot(API_KEY, API_SECRET, { baseURL: BASE_URL });

const newOrder = async () => {
  spot
    .newOrder('BTCUSDT', 'BUY', 'MARKET', {
      quantity: 0.0001,
    })
    .then((response) => {
      console.log('response', response);
      console.log('json response', JSON.stringify(response.data, null, 2));
      console.log('response.data', response.data);
    })
    .catch((error) => {
      console.log('error', error);
    });
};

/** Response
{
  "symbol": "BTCUSDT",
  "orderId": 486346,
  "orderListId": -1,
  "clientOrderId": "WzPVvTUZnTDRlljfItYCqq",
  "transactTime": 1743781874065,
  "price": "0.00000000",
  "origQty": "0.00100000",
  "executedQty": "0.00100000",
  "origQuoteOrderQty": "0.00000000",
  "cummulativeQuoteQty": "83.11434000",
  "status": "FILLED",
  "timeInForce": "GTC",
  "type": "MARKET",
  "side": "BUY",
  "workingTime": 1743781874065,
  "fills": [
    {
      "price": "83114.34000000",
      "qty": "0.00100000",
      "commission": "0.00000000",
      "commissionAsset": "BTC",
      "tradeId": 173863
    }
  ],
  "selfTradePreventionMode": "EXPIRE_MAKER"
}
 */
await newOrder();
